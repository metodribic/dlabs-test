(function(){
  'use strict';

  angular
    .module('App', [
      'ui.router',
      'ngResource',
      'Models',
      'Services'
    ])
    .config(AppConfig)
    .run(App);

  AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  App.$inject = ['$rootScope', 'BalanceChanges'];

  function AppConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
          .state('home', {
              url: '/',
              templateUrl: 'app/home/home.view.html',
              controller: 'IndexCtrl'
          })

          .state('overview', {
              url: '/overview',
              templateUrl: 'app/overview/overview.view.html',
              controller: 'OverviewCtrl'
          })

          .state('expenses', {
              url: '/expenses',
              templateUrl: 'app/expenses/expenses.view.html',
              controller: 'ExpensesCtrl'
          })

          .state('incomes', {
              url: '/incomes',
              templateUrl: 'app/incomes/incomes.view.html',
              controller: 'IncomesCtrl'
          });

    $urlRouterProvider.otherwise('/');
  }

  function App($rootScope, BalanceChanges) {

    // get date and calculate MONTH and YEAR
    var date = new Date();
    $rootScope.year = date.getFullYear();
    $rootScope.month = date.getMonth();
    // initialize month names
    $rootScope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // get next month
    $rootScope.previousMonth = function(){
      var month = $rootScope.month;
      // check if jumping into previos year
      if(month === 0){
        $rootScope.year -= 1;
        month = 11;
      }
      else {
        month = month - 1;
      }
      $rootScope.month = month;
    };

    // get previos month
    $rootScope.nextMonth = function(){
      var month = $rootScope.month;
      // check if jumping into new year
      if(month === 11){
        $rootScope.year += 1;
        month = 0;
      }
      else {
        month = month + 1;
      }
      $rootScope.month = month;
    };

    function updateData(){
      console.log('update data');
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
    }


    // function for adding leading zero if needed - API CONSTRAIN
    function leadingZeroMonth(){
      var tmp = '0' + ($rootScope.month+1);
      return tmp.substring($rootScope.month.length-3, $rootScope.month.length);
    }



    // ifm month changes, updates values
    $rootScope.$watch('month', function() {
        $rootScope.$broadcast('UPDATE');
        updateData();
    });



  }
})();
