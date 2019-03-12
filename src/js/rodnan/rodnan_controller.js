angular.module('ngCriterio').controller('RodnanController', function($scope, $routeParams){
  $scope.visibility.footer = true;
  $scope.tabs.esclerosis = false;
  $scope.tabs.info = false;
  $scope.tabs.subtypes = false;
  $scope.tabs.rodnan = true;

  $scope.pop_up = '';

  $scope.setPopup = function(element){
    $scope.pop_up = element;
  };

  $scope.rodnan_score = 0;
  $scope.rodnan_questions = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  $scope.rodnan_active = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


  $scope.set_rodnan_input = function(position, value){
    $scope.rodnan_questions[position] = value;
    $scope.rodnan_active[position] = 1;
    $scope.pop_up = '';
    $scope.rodnan_score = 0;
    angular.forEach($scope.rodnan_questions, function(item) {
      $scope.rodnan_score += item;
    });
  };
});
