var loginForm = function (AUTH_EVENTS) {
  return {
    restrict: 'A',
    template: '<div  ng-include="\'views/login.html\'"></div>',
    link: function (scope) {
      var showDialog = function () {
        scope.visible = true;
      };

      scope.visible = false;
      scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
    }
  };
};
app.directive('loginForm',loginForm);
