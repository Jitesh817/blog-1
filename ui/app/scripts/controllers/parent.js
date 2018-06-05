var parentCtrl = function ($state, $rootScope, userSession, AUTH_EVENTS, $scope) {

  // FUNCTION TO LOGOUT USER
  $scope.logout = function () {
    userSession.destroy();
    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };
  $scope.userRole = userSession.userRole;
  console.log('user-session', userSession);
  console.log($state.current.name);
  if ($state.current.name === 'parent' || $state.current.name === 'parent.home') {
    $state.transitionTo('parent.home');
  } else if ($state.current.name === 'parent.myPosts') {
    $state.go('parent.myPosts');
  }
};
app.controller('parentCtrl',parentCtrl);
