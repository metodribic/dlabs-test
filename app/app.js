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
    $rootScope.month = new Date();
    /**
     * App logic goes here
     */
  }
})();
