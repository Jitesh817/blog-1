var parentCtrl = function ($state, $rootScope, userSession, AUTH_EVENTS, $scope) {

  // FUNCTION TO LOGOUT USER
  $scope.logout = function () {
    userSession.destroy();
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };
  $scope.userRole = userSession.userRole;
  console.log('user-session', userSession);

};
app.controller('parentCtrl',parentCtrl);
