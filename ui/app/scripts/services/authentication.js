app.constant('AUTH_EVENTS', {
  loginSuccess: 'login-success',
  loginFailed: 'login-failed',
  logoutSuccess: 'logout-success',
  sessionTimeout: 'session-timeout',
  notAuthenticated: 'not-authenticated',
  notAuthorized: 'not-authorized'
});

app.constant('USER_ROLES', {
  admin: 'admin',
  user: 'user',
  root: 'root'
});


app.factory('AuthService', function ($http, userSession, apiURL) {
  var authService = {};

  authService.login = function (credentials) {
    return $http
      .post(apiURL.url+'login', credentials)
      .then(function (res) {
        userSession.create(res.data['user']['auth_token'], res.data['user']['id']['$oid']);
        return res.data['user'];
      })
      .catch(function (error) {
        return error;
      });
  };


  authService.isValidToken = function (token,callback) {
    $http.get(apiURL.url +'user',{
      headers:{'Authorization':token}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        callback(error);
      })
  };
  return authService;
});


app.service('userSession', function ($http, apiURL) {
  this.create = function (authToken, userId) {
    this.authToken = authToken;
    this.userId = userId;
    localStorage.authToken = authToken;
    localStorage.userId = userId;
  };
  this.destroy = function () {
    this.authToken = null;
    this.userId = null;
    localStorage.clear();
  };
  this.check = function () {
    if(localStorage.authToken){
      this.authToken = localStorage.authToken;
      this.userId = localStorage.userId;
      return true;
    }
    else{
      return false;
    }
  };
});

