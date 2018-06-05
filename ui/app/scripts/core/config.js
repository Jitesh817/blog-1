'use strict';

var config = function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  $stateProvider
    .state({
      name:'parent',
      url:'/',
      templateUrl: 'views/parent.html',
      controller: 'parentCtrl'
    })
    .state({
      name:'parent.home',
      url:'^/home',
      templateUrl:'views/home.html',
      controller:'homeCtrl'
    })
    .state({
      name:'parent.myPosts',
      url:'^/posts',
      templateUrl:'views/myPost.html',
      controller:'myPostCtrl'
    })
    .state({
      name:'parent.post',
      url:'^/posts/:postID',
      templateUrl:'views/post.html',
      controller:'postCtrl'
    });

  $urlRouterProvider.otherwise('/');
  // $locationProvider.html5Mode(true);  //activate HTML5 Mode
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('blue');


  // Defining default themes for angualr material toasters
  $mdThemingProvider.theme('success-toast');
  $mdThemingProvider.theme('fail-toast');

};
app.config(config);
