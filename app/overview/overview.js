angular.module('App')
  .controller('OverviewCtrl', ['$scope','$state', function ($scope,$state) {
      $scope.earned = 4023.43;
      $scope.spent = 402.43;
    }]);
