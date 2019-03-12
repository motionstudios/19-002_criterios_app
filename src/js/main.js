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
