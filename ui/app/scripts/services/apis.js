// FACTORY SERVICE TO GET AUTH TOKEN
app.factory('authToken', function authTokenFactory() {
  return localStorage.getItem('authToken');
});

// FACTORY SERVICE TO USER LOGIN ON LIVE SERVER
var liveLogin = function ($http) {
  var liveLoginFactory = function (user, callback) {
    $http.post('https://api.iotrek.in/api/v1/login',user)
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        callback(error)
      })
  };
  return liveLoginFactory;
};
app.factory('liveLogin',liveLogin);

// FACTORY SERVICE FOR GETTING  LIVE CUSTOMER LIST
var liveCustomers = function ($http,$rootScope,AUTH_EVENTS) {
  var liveCustomersFactory = function (token,callback) {
    $http.get('https://api.iotrek.in/api/v1/customers',{
      headers:{'Authorization':token}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return liveCustomersFactory;
};
app.factory('liveCustomers',liveCustomers);

// FACTORY SERVICE FOR FINDING LIVE USERS
var liveUsers = function ($http,$rootScope,AUTH_EVENTS) {
  var liveUsersFactory = function (id,token,callback) {
    $http.get('https://api.iotrek.in/api/v1/users?customer_id=' + id,{
      headers:{'Authorization':token}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return liveUsersFactory;
};
app.factory('liveUsers',liveUsers);

// FACTORY SERVICE FOR ADDING NEW LIVE DEVICE
var liveAddDevice = function ($http,$rootScope,AUTH_EVENTS) {
  var liveAddDeviceFactory = function (data,token,callback) {
    $http({
      method:'POST',
      url:'https://api.iotrek.in/api/v1/devices',
      headers:{'Authorization':token},
      data:data
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return liveAddDeviceFactory;
};
app.factory('liveAddDevice',liveAddDevice);

// FACTORY SERVICE FOR GETTING USER DETAILS
var user = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var userFactory = function (callback) {
    $http.get(apiURL.url +'user/details',{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return userFactory;
};
app.factory('user',user);

// FACTORY SERVICE TO  FETCH DEVICE DETAILS
var deviceInfo = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var deviceInfoFactory = function (id,callback) {
    $http.get(apiURL.url+'devices/' + id,{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return deviceInfoFactory;
};
app.factory('deviceInfo',deviceInfo);

//FACTORY SERVICE TO FETCH LATEST DEVICE DETAILS
var deviceLatestData=function($http,apiURL,AUTH_EVENTS,$rootScope){
  var deviceLatestDataFactory=function(id,callback){
    $http.get(apiURL.url+'devices/' + id +'/latestData',{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      });
  };
  return deviceLatestDataFactory;
};
app.factory('deviceLatestData',deviceLatestData);

 // FACTORY SERVICE TO FETCH DATA FOR GRAPHS
var graphData=function($http,apiURL,AUTH_EVENTS,$rootScope){
  var graphDatafactory=function (id,start,end,callback) {
    $http.get(apiURL.url+'network/data/'+ id +'?end='+end+'&start='+start,{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function(response){
        callback(response);
      })
      .catch(function(error){
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      });
  };
  return graphDatafactory;
};
app.factory('graphData',graphData);



// FACTORY SERVICE FOR GETTING CUSTOMER LIST
var customer = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var customerFactory = function (callback) {
    $http.get(apiURL.url + 'customers',{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401) //Discussion need to be done regarding how to handle this.
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return customerFactory;
};
app.factory('customer',customer);


// FACTORY SERVICE FOR UPDATING CUSTOMER INFO
var updateCustomer = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var updateCustomerFactory = function (data,callback) {
    $http({
      method: 'put',
      url: apiURL.url + 'customers/' + data['_id']['$oid'],
      headers: {'Authorization': localStorage.authToken},
      data: data
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return updateCustomerFactory;
};
app.factory('updateCustomer',updateCustomer);


// FACTORY SERVICE FOR UPDATING USER INFO
var updateUser = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var updateUserFactory = function (data,callback) {
    $http({
      method: 'put',
      url: apiURL.url + 'users/' + data['_id']['$oid'],
      headers: {'Authorization': localStorage.authToken},
      data: data
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return updateUserFactory;
};
app.factory('updateUser',updateUser);


// FACTORY SERVICE FOR ADDING NEW CUSTOMER
var newCustomer = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var newCustomerFactory = function (data,callback) {
    $http({
      method:'POST',
      url:apiURL.url + 'customers',
      headers:{'Authorization':localStorage.authToken},
      data:data
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return newCustomerFactory;
};
app.factory('newCustomer',newCustomer);


// FACTORY SERVICE FOR ADDING NEW USER
var newUser = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var newUserFactory = function (data,callback) {
    $http({
      method:'POST',
      url:apiURL.url + 'users',
      headers:{'Authorization':localStorage.authToken},
      data:data
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return newUserFactory;
};
app.factory('newUser',newUser);


// FACTORY SERVICE FOR FINDING USERS
var getUsers = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var getUsersFactory = function (id,callback) {
    $http.get(apiURL.url + 'users?customer_id=' + id,{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return getUsersFactory;
};
app.factory('getUsers',getUsers);

//FACTORY SERVICE TO VIEW DEMO REQUESTS
var getRequests = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var getRequestsFactory = function (callback) {
    $http.get(apiURL.url + 'demo',{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response)

      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return getRequestsFactory;
};
app.factory('getRequests',getRequests);

// FACTORY SERVICE FOR UPDATING REQUEST
var updateRequest = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var updateRequestFactory = function (data,callback) {
    $http({
      method: 'PUT',
      url: apiURL.url + 'demo/' + data[0].id,
      headers: {'Authorization': localStorage.authToken},
      data: {notes:data[0].notes,
        status:data[0].status,
        company:data[0].company
      }
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return updateRequestFactory;
};
app.factory('updateRequest',updateRequest);

// FACTORY SERVICE FOR DEVICE LIST FOR CUSTOMERS
var customerDeviceList = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var customerDeviceListFactory = function (id,callback) {
    $http.get(apiURL.url + 'customers/' + id + '/devices',{
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return customerDeviceListFactory;
};
app.factory('customerDeviceList',customerDeviceList);


// FACTORY SERVICE FOR GETTING DEVICE LIST
var deviceList = function ($http,apiURL,apiURL,$rootScope,AUTH_EVENTS) {
  var deviceListFactory = function (type,value,search,callback) {
    var url = '';
    if(type == 'type'){
      url = apiURL.url+'devices?type='+value;
    }
    else{
      if(type == 'user'){
        url = apiURL.url+'devices?uid='+value;
      }
      else{
        if(type == 'customer'){
          url = apiURL.url+'devices?cid='+value;
        }
        else{
          if(type == 'page'){
            url = apiURL.url+'devices?page='+value;
          }
          else {
            url = apiURL.url + 'devices';
          }
        }
      }
    }
    if(search){
      url=url+'&search='+search ;
    }
    $http.get(url, {
      headers: {'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return deviceListFactory;
};
app.factory('deviceList',deviceList);


// FACTORY SERVICE FOR ADDING NEW DEVICE
var addDevice = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var addDeviceFactory = function (data,callback) {
    $http({
      method:'POST',
      url:apiURL.url + 'devices',
      headers:{'Authorization':localStorage.authToken},
      data:data
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return addDeviceFactory;
};
app.factory('addDevice',addDevice);

var addPost = function ($http, apiURL, $rootScope, AUTH_EVENTS) {
  var addPostFactory = function (data,callback) {
    $http({
      method:'POST',
      url:apiURL.url + 'posts',
      headers:{'Authorization':localStorage.authToken},
      data:data
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return addPostFactory;
};
app.factory('addPost',addPost);

// FACTORY SERVICE FOR UPDATING DEVICE
var updateDevice = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var updateDeviceFactory = function (id,data,callback) {
    $http({
      method: 'PUT',
      url: apiURL.url + 'devices/' + id,
      headers: {'Authorization': localStorage.authToken},
      data: data
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return updateDeviceFactory;
};
app.factory('updateDevice',updateDevice);


// FACTORY SERVICE FOR FETCHING WHOLE DATA OF A DEVICE
var deviceData = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var deviceDataFactory = function (id,page,callback) {
    $http.get(apiURL.url+'device/' + id + '/all?page='+page, {
      headers: {'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return deviceDataFactory;
};
app.factory('deviceData',deviceData);


// FACTORY SERVICE FOR TESTING MODULE
var testing = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var testingFactory = function (data,callback) {
    $http.get(apiURL.url+'devices/test?deveui=' +
      data.deveui + '&begin='+ data.start + '&end=' + data.end , {
      headers: {'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return testingFactory;
};
app.factory('testing',testing);


// FACTORY SERVICE FOR DEVICE LIST PLAIN
var devList = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var devListFactory = function (callback) {
    $http.get(apiURL.url+'devices/list', {
      headers: {'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return devListFactory;
};
app.factory('devList',devList);

// FACTORY SERVICE FOR TEST API
var testData = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var testDataFactory = function (callback) {
    $http.get(apiURL.url+'test/data', {
      headers: {'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response)
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return testDataFactory;
};
app.factory('testData',testData);

// FACTORY SERVICE TO FETCH REQUESTS
var deviceRequests = function ($http,apiURL,$rootScope,AUTH_EVENTS) {
  var deviceRequestsFactory = function (id, callback) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.get(apiURL.url+'devices/' + id + '/requests', {
      headers:{'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return deviceRequestsFactory;
};
app.factory('deviceRequests',deviceRequests);


// FACTORY SERVICE TO SEND DATA TO DEVICE
var sendData = function ($http, apiURL, $rootScope, AUTH_EVENTS) {
  var sendDataFactory = function (id, data, callback) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.post(apiURL.url+'devices/' + id + '/requests', data, {
      headers:{'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        if(error.status == 401)
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        else
          callback(error);
      })
  };
  return sendDataFactory;
};
app.factory('sendData',sendData);

// FACTORY SERVICE TO UPLOAD FILE
var uploadBulk = function ($http, apiURL) {
  var uploadBulkFactory = function (file, cid, uid,callback) {
    $http.post(apiURL.url+'devices/create/bulk?customer_id='+cid+'&user_id='+uid,file, {
      headers:{'Authorization': localStorage.authToken}
    })
      .then(function (response) {
        callback(response);
      })
      .catch(function (error) {
        callback(error)
      })
  };
  return uploadBulkFactory;
};
app.factory('uploadBulk',uploadBulk);
