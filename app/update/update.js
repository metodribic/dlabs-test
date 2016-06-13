angular.module('App')
  .controller('IncomesCtrl', ['$scope','$rootScope','$state','BalanceChanges', 'DeleteChanges', function ($scope,$rootScope, BalanceChanges, DeleteChanges) {

      var daysOfMonth = new Date($rootScope.year, $rootScope.month+1, 0).getDate();

      $scope.days = [];
      $scope.inputValue;
      getDays();
      function getDays(){
        var obj = {};
        for(var i=1; i<=daysOfMonth; i++){
          obj = {};
          switch(i) {
            case 1:
              obj.id = 1;
              obj.value = 1;
              obj.label = '1st';
              break;
            case 2:
              obj.id = 2;
              obj.value = 2;
              obj.label = '2nd';
              break;
            case 3:
              obj.id = 3;
              obj.value = 3;
              obj.label = '3rd';
              break;
            default:
              obj.id = i;
              obj.value = i;
              obj.label = i+'th';
          }
          $scope.days.push(obj);
        }
      }

      function leadingZeroMonth(){
        // +1 because starting with 0
        var tmp = '0' + ($rootScope.month+1);
        return tmp.substring($rootScope.month.length-3, $rootScope.month.length);
      }


      $scope.selected = $scope.days[$rootScope.day-1];





    }]);