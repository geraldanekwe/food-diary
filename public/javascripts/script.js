var app = angular.module("quotesApp", []);

app.controller("MainCtrl", function($scope, $http) {
  $http.get("/quotes").success(function(data) {
    $scope.quotes = data.quotes;
  });

  $scope.addQuote = function() {
    $scope.formError = "";
    $http.post("/quotes", {
      quote: $scope.newQuote
    }).success(function(data) {
      $scope.quotes.push(data.quote);
      $scope.newQuote = "";
    }).catch(function(err) {
      $scope.formError = err.data.error
    });
  }
  $scope.deleteQuote = function(quoteIndex) {
    $http.delete("/quotes/" + quoteIndex).success(function(response) {
      $scope.quotes.splice(parseInt(response.deletedIndex), 1);
    }).catch(function(response) {

    });
  }
});
