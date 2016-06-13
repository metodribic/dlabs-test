(function(){
  'use strict';

  angular
    .module('App', [
      'ui.router'
    ])
    .config(AppConfig)
    .run(App);

  AppConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  App.$inject = ['$rootScope'];

  function AppConfig($stateProvider, $urlRouterProvider) {
    // var homeState = {
    //   url: '/',
    //   templateUrl: 'app/home/home.view.html'
    // };

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

  function App($rootScope) {
    var date = new Date();
    $rootScope.year = date.getFullYear();
    $rootScope.month = date.getMonth();
    $rootScope.monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

    // get next month
    $rootScope.previousMonth = function(){
      var month = $rootScope.month;
      if(month === 0){
        $rootScope.year -= 1;
        month = 11;
      }
      else {
        month = month - 1;
      }
      $rootScope.month = month;
    };

    // get prev month
    $rootScope.nextMonth = function(){
      var month = $rootScope.month;
      if(month === 11){
        $rootScope.year += 1;
        month = 0;
      }
      else {
        month = month + 1;
      }
      $rootScope.month = month;
    };

    $rootScope.$watch('month', function() {
        $rootScope.$broadcast('UPDATE');
        console.log('month updates');
    });
  }
})();
