angular.module('ngCriterio').controller('EsclerosisController', function($scope, $routeParams){
  $scope.visibility.footer = true;
  $scope.tabs.esclerosis = true;
  $scope.tabs.info = false;
  $scope.tabs.subtypes = false;
  $scope.tabs.rodnan = false;




  $scope.score = $routeParams.param || 0;
  $scope.questions = [0,0,0,0];
  $scope.puffy_esclerodactilia = [0,0];
  $scope.ulceras_pitting = [0,0];
  $scope.hap_epi = [0,0];
  $scope.aca_ata_rna = [0,0,0];
  $scope.pop_up = '';

  $scope.setPopup = function(element){
    $scope.pop_up = element;
  };

  $scope.sumQuestions = function(element){
    if(element !== undefined){
      switch (element) {
        case 'puffy_yes':
          $scope.puffy_esclerodactilia[1] = 0;
          break;
        case 'esclerodactilia_yes':
          $scope.puffy_esclerodactilia[0] = 0;
          break;
        case 'ulceras_yes':
          $scope.ulceras_pitting[1] = 0;
          break;
        case 'pitting_yes':
          $scope.ulceras_pitting[0] = 0;
          break;
        case 'hap_yes':
          $scope.hap_epi[1] = 0;
          break;
        case 'epi_yes':
          $scope.hap_epi[0] = 0;
          break;
        case 'aca_yes':
          $scope.aca_ata_rna[1] = 0;
          $scope.aca_ata_rna[2] = 0;
          break;
        case 'ata_yes':
          $scope.aca_ata_rna[0] = 0;
          $scope.aca_ata_rna[2] = 0;
          break;
        case 'rna_yes':
          $scope.aca_ata_rna[1] = 0;
          $scope.aca_ata_rna[0] = 0;
          break;
          default:
            console.log('invalid case');
      }
    }

    $scope.score = 0;
    angular.forEach($scope.questions, function(item) {
      $scope.score += item;
    });

    $scope.score += (Math.max($scope.puffy_esclerodactilia[0], $scope.puffy_esclerodactilia[1]));
    $scope.score += (Math.max($scope.ulceras_pitting[0], $scope.ulceras_pitting[1]));
    $scope.score += (Math.max($scope.hap_epi[0], $scope.hap_epi[1]));
    $scope.score += (Math.max($scope.aca_ata_rna[0], Math.max($scope.aca_ata_rna[1], $scope.aca_ata_rna[2])));
  };

});
