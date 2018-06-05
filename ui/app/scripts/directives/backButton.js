var backButton = function () {
  return {
    restrict: 'E',
    template: '<button class="backBtn btn btn-success"><i class="glyphicon glyphicon-arrow-left"></i> {{back}}</button>',
    scope: {
      back: '@back'
    },
    link: function (scope, element, attrs) {
      $(element[0]).on('click', function () {
        history.back();
        scope.$apply();
      });
    }
  }
};

app.directive('backButton',backButton);
