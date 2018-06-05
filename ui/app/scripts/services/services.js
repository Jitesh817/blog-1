// VALUE SERVICE FOR API URL
app.service('apiURL',function (__envr) {
  this.url = __envr.apiUrl;
});

// FACTORY SERVICE TO SHOW ALERT MESSAGE
var alertMessage = function ($mdDialog) {
  var alertMessageFactory = function (title, message) { /*receives title and message of the alert to be shown*/
    $mdDialog.show(
      $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title(title)
        .textContent(message)
        .ariaLabel('Alert Box')
        .ok('Okay!')
        .targetEvent()
    );
  };
  return alertMessageFactory;
};
app.factory('alertMessage',alertMessage);


// FACTORY SERVICE TO SHOW TOASTERS
var toaster = function ($mdToast) {
  var toasterFactory = function (theme, message) { /*receives theme and message of the toaster*/
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    var toastPosition = angular.extend({},last);


    function sanitizePosition() {

      last = angular.extend({},{bottom:true,top:false,left:false,right:true});
    }
    function getToastPosition() {
      sanitizePosition();

      return Object.keys(toastPosition)
        .filter(function(pos) { return toastPosition[pos]; })
        .join(' ');
    }

    var pinTo = getToastPosition();

    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(pinTo )
        .hideDelay(3000)
        .theme(theme)
    );
  };
  return toasterFactory;
};
app.factory('toaster',toaster);

// FACTORY SERVICE TO GIVE STYLE TO NAV BAR WHEN PARTICULAR PAGE OPENS
var navBarActive = function ($rootScope) {
  var navBarActiveFactory = function (key) {
    $rootScope.navStyle = {};
    $rootScope.navStyle[key] = {'background-color': '#ffffff','color':'#1a6daf'};
  };
  return navBarActiveFactory;
};
app.factory('navBarActive',navBarActive);

