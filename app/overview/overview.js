angular.module('App')
  .controller('OverviewCtrl', ['$scope','$rootScope','$state','BalanceChanges', function ($scope,$rootScope,$state, BalanceChanges) {
      $scope.earned = 4023.43;
      $scope.spent = 402.43;

      // set a filter
      // var filterArg = 'filter[period]='+$rootScope.year+'-'+leadingZeroMonth();
      //
      // // get balance
      // BalanceChanges.get({filter: filterArg}).$promise.then(function(response){
      //   console.log(response);
      //
      //   // calcalate
      // });
      //
      // // function for adding leading zero if needed - API CONSTRAIN
      // function leadingZeroMonth(){
      //   var tmp = '0' + $rootScope.month;
      //   return tmp.substring($rootScope.month.length-3, $rootScope.month.length);
      // }

    }]);
