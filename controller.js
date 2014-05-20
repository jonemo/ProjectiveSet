var myApp = angular.module('SetsGame', []);

myApp.directive('card', function() {
    return {
        restrict: 'A',
        template: '<div class="card"></div>',
        replace: true,
        link: function(scope, element, attr, ctrl) {

          var val = scope.c.value;
          //element[0].innerHTML = val;

          for (var i=5; i>=0; i--) {
            var dot = document.createElement("div");
            dot.className = 'dot';
            if (val >= Math.pow(2,i)) {
              dot.className += ' dot' + (5-i);
            } else {
              dot.className += ' nodot';
            }
            element[0].appendChild(dot);
            val = val % Math.pow(2,i);
          }

          scope.$watch('c.selected', function (newvalue, oldvalue) {
            if (newvalue) element[0].classList.add('selected');
            else element[0].classList.remove('selected');
          });
        }
    }
});

myApp.directive('monochromecard', function() {
    return {
        restrict: 'A',
        template: '<div class="card"></div>',
        replace: true,
        link: function(scope, element, attr, ctrl) {

          var val = scope.c;

          for (var i=5; i>=0; i--) {
            var dot = document.createElement("div");
            dot.className = 'dot';
            if (val >= Math.pow(2,i)) {
              dot.className += ' monodot';
            } else {
              dot.className += ' nodot';
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

  $scope.noOfDots = 6;
  $scope.gameInitialized = false;

  $scope.initializeGame = function (noOfDots) {
    $scope.deck = [];
    $scope.visibleCards = [];
    $scope.correctSets = [];
    $scope.startingTime = Date.now();

    if (noOfDots && parseInt(noOfDots) >= 3 && parseInt(noOfDots) <= 6) {
      $scope.noOfDots = noOfDots;
    }

    // fill 1..64 into the cards array
    var i=Math.pow(2, $scope.noOfDots);
    while ( --i ) $scope.deck.push( {value:i, selected:false} );

    // shuffle
    fisherYates($scope.deck);

    // first seven cards are put on table
    for ( i=0; i<$scope.noOfDots+1; i++) {
      $scope.visibleCards.push( $scope.deck.shift() );
    }

    $scope.gameInitialized = true;

    ga('send', 'event', 'round_start', 'deck_initialized', $scope.noOfDots);
  }

  $scope.correctSetSelected = function () {
    var correctSet = [];
    for (var i=0; i<$scope.visibleCards.length; i++) {
      if ($scope.visibleCards[i].selected) {
        correctSet.push($scope.visibleCards[i]);
        $scope.visibleCards.splice(i,1);
        i--;
      }
    }

    $scope.correctSets.reverse();
    $scope.correctSets.push(correctSet); // could be chained - if pushed weren't returning the length of the new array instead - doh
    $scope.correctSets.reverse();

    if ($scope.deck.length < correctSet.length) {
      var timeNeeded = ((Date.now()-$scope.startingTime)/1000);
      setTimeout(function () {alert('Deck finished in ' + timeNeeded + ' seconds')}, 0);
      ga('send', 'event', 'round_end', 'deck_completed', timeNeeded);
    } else {
      for (var i=0; i<correctSet.length; i++) {
        $scope.visibleCards.push( $scope.deck.shift() );
      }
    }
  }

  $scope.toggleCard = function (c) {
    var xor = 0, selectedCnt = 0;
    for (var i=0; i<$scope.noOfDots+1; i++) {
      if ($scope.visibleCards[i] === c) c.selected = ! c.selected;
      if ($scope.visibleCards[i].selected) {
        xor ^= $scope.visibleCards[i].value;
        selectedCnt++;
      }
    }

    if (xor === 0 && selectedCnt > 0) $scope.correctSetSelected();
  };


  $(document).on("keydown", function (e) {
    var c = {};
    var ekc = e.keyCode;
    if(ekc >= 96 && ekc <= 105) ekc -= 48;
    if(ekc < 49 || ekc > 49 + $scope.noOfDots) return false;
    var cardId = ekc - 49;

    $scope.toggleCard($scope.visibleCards[cardId]);
    $scope.$apply();
  });



}]);
