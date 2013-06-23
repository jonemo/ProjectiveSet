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
            
            console.log(val);
            
            for (var i=5; i>=0; i--) {
              var dot = document.createElement("div");
              dot.className = 'dot';
              if (val >= Math.pow(2,i)) {
                dot.className += ' dot' + (5-i);
              }
              element[0].appendChild(dot);
              val = val % Math.pow(2,i);
            }
            
            
        }
    }
});

function fisherYates ( myArray ) {
  var i = myArray.length, j, temp;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = myArray[i];
     myArray[i] = myArray[j]; 
     myArray[j] = temp;
   }
}

myApp.controller( 'SetsGameController', ['$scope', '$http', function ($scope, $http) {

  $scope.deck = [];
  
  // fill 1..64 into the cards array
  var i=64;
  while ( --i ) $scope.deck.push(i+1);
  
  // shuffle
  fisherYates($scope.deck);


}]);