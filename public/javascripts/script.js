var app = angular.module("foodDiaryApp", []);

app.controller("FoodDiaryCtrl", function($scope, $http) {

  $http.get("/").success(function(data) {
    console.log(data);

  });

  function computeWeight() {
    var totalCalories = $scope.foodList.reduce(function(accumulator, food) {
      return accumulator + (food.calories * food.servings);
    }, 0);
    $scope.weightGained = Math.floor(totalCalories / 3500);
    $scope.currentWeight = parseInt($scope.weightGained) + parseInt($scope.userData.weight);
  }

  function computeBMI() {
    var inches = $scope.userData.unit === 'in' ? $scope.userData.height : $scope.userData.height * 0.393701;
    $scope.bmi = Math.floor(($scope.userData.weight * 703) / Math.pow(inches, 2));
  }

  $scope.saveUser = function() {
    $http.post("/users", $scope.user).success(function(data) {
      $scope.userData = data;
      computeBMI();
    }).catch(function(err) {

    });

    $scope.user = {};
  }
  $scope.saveFood = function() {
    $scope.food.date = new Date();
    $http.post("/food/", $scope.food).success(function(data) {
      $scope.foodList = data;
      computeWeight();
    }).catch(function(err) {

    });

    $scope.food = {};
  }
  $scope.deleteItem = function(itemIndex) {
    $http.delete("/food/" + itemIndex).success(function(response) {
      $scope.foodList.splice(parseInt(response.deletedIndex), 1);
    }).catch(function(response) {

    });
  }

});
