angular.module('Services', [])

  // GET DATA
	.factory('Data', function ($http, Session, $rootScope) {
    var data = {};
    data.update = function() {
      console.log('UPDATE IN SERVICE!');
      // prepare filter for getting data from api
      var filterArg = 'filter[period]='+$rootScope.year+'-'+leadingZeroMonth();

      // GET data
      BalanceChanges.get({filter: filterArg}).$promise.then(function(response){
        console.log(response);
        // calcalate
        var objects = response.data;
        $rootScope.expenses = [];
        $rootScope.incomes = [];
        $rootScope.overview = {
          'incomes': 0,
          'expenses': 0
        };

        // sum all incomes and expenses
        for(var index in objects){
          if(objects[index].attributes.change_type === "expense"){
            $rootScope.overview.expenses += parseFloat(objects[index].attributes.value);
            $rootScope.expenses.push(objects[index]);
          }
          else{
            $rootScope.overview.incomes += parseFloat(objects[index].attributes.value);
            $rootScope.incomes.push(objects[index]);
          }
        }
        $rootScope.diff = $rootScope.overview.incomes - $rootScope.overview.expenses;
      });

      // function for adding leading zero if needed - API CONSTRAIN
      function leadingZeroMonth(){
        var tmp = '0' + $rootScope.month;
        return tmp.substring($rootScope.month.length-3, $rootScope.month.length);
      }
    };
    return data;
  });
