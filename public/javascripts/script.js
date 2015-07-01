var app = angular.module("foodDiaryApp", []);

app.controller("FoodDiaryCtrl", function($scope, $http) {
  $scope.user = {};
  $scope.food = {};

  $scope.saveUser = function() {
    console.log($scope.user);
    $scope.user = {};
  }
  $scope.saveFood = function() {
    console.log($scope.food);
    $scope.user = {};
  }

});
