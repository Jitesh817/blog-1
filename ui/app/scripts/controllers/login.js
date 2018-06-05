var loginCtrl = function ($scope, $rootScope, AUTH_EVENTS, AuthService, $location, apiURL) {
  $scope.credentials = {
    email: '',
    password: ''
  };
  $scope.login = function (credentials) {
    AuthService.login(credentials).then(function (user) {
      if(user.data){
        if(user.data.errors)
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed,user.data.errors);
      }
      else{
        $location.path('parent');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }
    }, function () {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed,'Retry Login');
    });
  };
};
app.controller('loginCtrl',loginCtrl);
