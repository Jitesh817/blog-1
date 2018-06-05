app.run(function ($rootScope, AUTH_EVENTS, AuthService, userSession) {

  $rootScope.$on('$stateChangeStart', function (event, next) {

    if(userSession.check()){
      AuthService.isValidToken(userSession.authToken, function (response) {
        if(response.data.error){
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      })
    }
  });
});
