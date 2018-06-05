var mainCtrl = function ($scope, AuthService, userSession, $location, toaster, $state) {
  $scope.currentUser = null;
  $scope.devices = [];
  if (userSession.check()) {
    AuthService.isValidToken(userSession.authToken, function (response) {
      $scope.begin = true;
      if (response.data.error) {
        userSession.destroy();
      }
      else {
        $scope.currentUser = response.data;
        $scope.isAuthorized = true;
        if ($state.current.name == '') {
          $location.path('parent');
        }
      }
    })
  }
  else {
    $scope.begin = true;
    userSession.destroy();
  }

  // FUNCTION TO SHOW TOAST ON DIFFERENT ACTIONS
  function showSimpleToast(message) {
    toaster("fail-toast", message);
  }

  // VARIOUS EVENTS TO CATCH ON THE BASES OF TYPE
  $scope.$on('not-authenticated', function (event, args) {
    userSession.destroy();
    event.preventDefault();
    $scope.isAuthorized = false;
    showSimpleToast('Authentication Failed. Please Login.');
  });
  $scope.$on('not-authorized', function (event, args) {
    event.preventDefault();
    $state.transitionTo('parent.home');
    showSimpleToast('Not Authorized');
  });
  $scope.$on('login-success', function (event, args) {
    $scope.isAuthorized = true;
  });
  $scope.$on('login-failed', function (event, args) {
    event.preventDefault();
    $scope.isAuthorized = false;
    showSimpleToast('Login Failed');
  });
  $scope.$on('logout-success', function (event, args) {
    $scope.isAuthorized = false;
    $state.transitionTo('parent');
  });

};
app.controller('mainCtrl', mainCtrl);
