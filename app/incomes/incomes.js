angular.module('App')
  .controller('IncomesCtrl', ['$scope','$rootScope','$state','BalanceChanges', 'UpdateChanges', function ($scope,$rootScope, $state, BalanceChanges, UpdateChanges) {
      var daysOfMonth = new Date($rootScope.year, $rootScope.month+1, 0).getDate();
      $scope.days = [];
      $scope.inputValue;
      $scope.enableUpdate = false;
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

      console.log($rootScope.day-1);
      $scope.selected = $scope.days[$rootScope.day-1];

      $scope.saveIncome = function(){
        var newIncome = new BalanceChanges();
        var atributes = {
          'value': $scope.inputValue,
          'change_type': 'income',
          'entry_date':$rootScope.year+'-'+leadingZeroMonth()+'-'+$scope.selected.value
        };
        newIncome.data = {
            "attributes": atributes
        };

        newIncome.$save(function(response){
          $rootScope.$broadcast('UPDATE');
          $state.go('incomes');
        });
      };


      $scope.saveExpense = function(){
        var newIncome = new BalanceChanges();
        var atributes = {
          'value': $scope.inputValue,
          'change_type': 'expense',
          'entry_date':$rootScope.year+'-'+leadingZeroMonth()+'-'+$scope.selected.value
        };
        newIncome.data = {
            "attributes": atributes
        };

        newIncome.$save(function(response){
          $rootScope.$broadcast('UPDATE');
          $state.go('expenses');
        });
      };

      $scope.delete = function(id){
        if (confirm('Are you sure you want delete this entry?')) {
          UpdateChanges.delete({id: id}, function(response){
            $rootScope.$broadcast('UPDATE');
          });
        }
      };

      $scope.updateMe = function(id){
        $scope.updatingObject = id;
        var tmpDay = id.attributes.entry_date.substring(id.attributes.entry_date.length-2, id.attributes.entry_date.length);
        $scope.selected = $scope.days[parseInt(tmpDay)-1];
        $scope.inputValue = parseFloat(id.attributes.value)*100;
        $scope.enableUpdate = true;
      };


      $scope.cancelUpdate = function(){
        $scope.enableUpdate = false;
      };


      $scope.updateIncome = function(){
        $scope.enableUpdate = false;

        var updatedIncome = new UpdateChanges();
        updatedIncome.id = $scope.updatingObject.id;
        var atributes = {
          'value': $scope.inputValue,
          'change_type': 'income',
          'entry_date':$rootScope.year+'-'+leadingZeroMonth()+'-'+$scope.selected.value
        };
        updatedIncome.data = {
            "attributes": atributes
        };

        updatedIncome.$update(function(response){
          $rootScope.$broadcast('UPDATE');
        });

      };


      $scope.updateExpanse = function(){
        $scope.enableUpdate = false;

        var updatedIncome = new UpdateChanges();
        updatedIncome.id = $scope.updatingObject.id;
        var atributes = {
          'value': $scope.inputValue,
          'change_type': 'expense',
          'entry_date':$rootScope.year+'-'+leadingZeroMonth()+'-'+$scope.selected.value
        };
        updatedIncome.data = {
            "attributes": atributes
        };

        updatedIncome.$update(function(response){
          $rootScope.$broadcast('UPDATE');
        });

      };


    }]);
