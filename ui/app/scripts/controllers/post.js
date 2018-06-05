var postCtrl = function (navBarActive, apiURL, $http, $scope, $state, addPost ,$stateParams) {
  navBarActive('post');

  // FUNCTION TO CHANGE VIEW
  var viewPost = function() {
    $http.get(apiURL.url+'posts/'+$stateParams.postID, {
      headers:{'Authorization':localStorage.authToken}
    })
      .then(function(response) {
        $scope.post = response.data;
        console.log(response.data)
      })
      .catch(function(error) {
        if(error.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        } else {
          console.log(error);
        }
      })
  };
  viewPost();
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

app.controller("postCtrl", postCtrl);
