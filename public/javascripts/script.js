var app = angular.module("foodDiaryApp", []);

app.controller("FoodDiaryCtrl", function($scope, $http) {

  $scope.saveUser = function() {
    $http.post("/users", $scope.user).success(function(data) {
      // $scope.data = data;
    }).catch(function(err) {
      // $scope.formError = err.data.error;
    });

    $scope.user = {};
  }
  $scope.saveFood = function() {
    $scope.food.date = new Date();
    $http.post("/food/", $scope.food).success(function(data) {
      $scope.foodList = data;
    }).catch(function(err) {
      $scope.formError = err.data.error;
    });

    $scope.food = {};
  }

});
