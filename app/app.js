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
    var homeState = {
      url: '/',
      templateUrl: 'app/home/home.view.html'
    };

    $stateProvider.state('home', homeState);

    $urlRouterProvider.otherwise('/');
  }

  function App($rootScope) {
    /**
     * App logic goes here
     */
  }
})();
