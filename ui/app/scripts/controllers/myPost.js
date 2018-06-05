var myPostCtrl = function (navBarActive, apiURL, $http, $scope, $state, addPost) {
  navBarActive('myPosts');

  // FUNCTION TO CHANGE VIEW
  var postList = function() {
    $http.get(apiURL.url+'posts/list', {
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function(response) {
        $scope.posts = response.data;
      })
      .catch(function(error) {
        if(error.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        } else {
          console.log(error);
        }
      })
  };
  postList();
  $scope.addNew = function (post) {
    // CHECK IF ELEMENT IS NOT NULL
    addPost(post,function (response) {
      if(response.data.error){
        toaster('fail-toast',response.data.error);
      }
      else{
        toaster('success-toast','Post Added Successfully');
        $scope.addPost = {};
        postList();
      }
    })
  };
};

app.controller("myPostCtrl", myPostCtrl);
