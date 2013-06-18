var myApp = angular.module('SetsGame', []);

myApp.directive('card', function() {
    return {
        restrict: 'A',
        template: '<div class="card"></div>',
        replace: true,
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            var listener = function() {
              //ctrl.$setViewValue(element[0].files[0]);
              //scope.$apply("uploadFile()");
            }
            element.bind('change', listener);
            
            var val = scope.c;
            
            console.log(element[0]);
            
            for (var i=5; i>=0; i--) {
              if (val > Math.pow(2,i)) {
                val = val % Math.pow(2,i);
                var dot = document.createElement("div");
                dot.className = 'dot dot' + (5-i);
                dot.innerHTML = 'dot' + (5-i);
                element[0].appendChild(dot);
              }
            }
            
            
        }
    }
});

myApp.controller( 'SetsGameController', ['$scope', '$http', function ($scope, $http) {

  $scope.cards = [
    parseInt('101010', 2),
    parseInt('101001', 2),
    parseInt('100110', 2),
    parseInt('011010', 2),
    parseInt('111010', 2),
    parseInt('101011', 2)
  ]

}]);