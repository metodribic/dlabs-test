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
              controller: 'IncomesCtrl'
          })

          .state('incomes', {
              url: '/incomes',
              templateUrl: 'app/incomes/incomes.view.html',
              controller: 'IncomesCtrl'
          })

          .state('addIncomes', {
              url: '/incomes/new',
              templateUrl: 'app/incomes/add/add.view.html',
              controller: 'IncomesCtrl'
          })

          .state('addExpense', {
              url: '/expenses/new',
              templateUrl: 'app/expenses/add/add.view.html',
              controller: 'IncomesCtrl'
          });

    $urlRouterProvider.otherwise('/');
  }

  function App($rootScope, BalanceChanges) {

    // get date and calculate MONTH and YEAR
    var date = new Date();
    $rootScope.year = date.getFullYear();
    $rootScope.month = date.getMonth();
    $rootScope.day = date.getDate();
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

    // FUNCTION FOR UPDATING DATA - NEED TO ADD IT IN SERVICE/FACTORY
    function updateData(){
      getDays();
      // prepare filter for getting data from api
      var filterArg = 'filter[period]='+$rootScope.year+'-'+leadingZeroMonth();

      // GET data
      BalanceChanges.get({filter: filterArg}).$promise.then(function(response){
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
          objects[index].attributes.value = parseFloat(objects[index].attributes.value)/100;
          if(objects[index].attributes.change_type === "expense"){
            $rootScope.overview.expenses += objects[index].attributes.value;
            $rootScope.expenses.push(objects[index]);
          }
          else{
            $rootScope.overview.incomes += objects[index].attributes.value;
            $rootScope.incomes.push(objects[index]);
          }
        }
        $rootScope.diff = $rootScope.overview.incomes - $rootScope.overview.expenses;
      });
    }


    // function for adding leading zero if needed - API CONSTRAIN
    function leadingZeroMonth(){
      // +1 because starting with 0
      var tmp = '0' + ($rootScope.month+1);
      return tmp.substring($rootScope.month.length-3, $rootScope.month.length);
    }


    // if month changes, broadcast for update
    $rootScope.$watch('month', function() {
        $rootScope.$broadcast('UPDATE');
    });

    // event listener for UPDATING
    $rootScope.$on('UPDATE', function(){
      updateData();
    });

    // GET array of days for current month - needed for dropdown
    // fill $scope,days with days in month
    // needed for dropdown
    function getDays(){
      $rootScope.days = [];
      var daysOfMonth = new Date($rootScope.year, $rootScope.month+1, 0).getDate();
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
        $rootScope.days.push(obj);
      }
      console.log($rootScope.days);
    }



  }
})();
