var app = angular.module('ngCriterio',['ngRoute']);

app.config(function($routeProvider){
  $routeProvider.when('/', {
    controller: "HomeController",
    templateUrl: "templates/main.html"
  });

  $routeProvider.when('/info', {
    controller: "InfoController",
    templateUrl: "templates/info.html"
  });

  $routeProvider.when('/subtypes', {
    controller: "SubtypesController",
    templateUrl: "templates/subtypes.html"
  });

  $routeProvider.when('/esclerosis', {
    controller: "EsclerosisController",
    templateUrl: "templates/esclerosis_form.html"
  });

  $routeProvider.when('/esclerosis/esclerosis_result/:param', {
    controller: "EsclerosisController",
    templateUrl: "templates/esclerosis_result.html"
  });

  $routeProvider.when('/rodnan', {
    controller: "RodnanController",
    templateUrl: "templates/rodnan.html"
  });

  $routeProvider.otherwise({redirectTo: '/'});

});

app.controller('MainController', function($scope, $routeParams){
  $scope.visibility = {
    footer: false
  };

  $scope.tabs = {
    esclerosis: false,
    info: false,
    subtypes: false
  };
});

angular.module('esclerosis',[]);

angular.module('info',[]);

angular.module('rodnan',[]);

angular.module('stadium',[]);

angular.module('subtypes',[]);

angular.module('ngCriterio').controller('HomeController', function($scope, $routeParams){
  $scope.visibility.footer = false;
  $scope.tabs.esclerosis = false;
  $scope.tabs.info = false;
  $scope.tabs.subtypes = false;
});

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

angular.module('ngCriterio').controller('InfoController', function($scope, $routeParams){
  $scope.visibility.footer = true;
  $scope.tabs.esclerosis = false;
  $scope.tabs.info = true;
  $scope.tabs.subtypes = false;
  $scope.tabs.rodnan = false;

});

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

angular.module('stadium').controller('StadiumsController', function($scope){
  $scope.stadium = {
    name: "Camp Nou"
  };
});

angular.module('ngCriterio').controller('SubtypesController', function($scope, $routeParams){
  $scope.visibility.footer = true;
  $scope.tabs.esclerosis = false;
  $scope.tabs.info = false;
  $scope.tabs.subtypes = true;
  $scope.tabs.rodnan = false;

});
