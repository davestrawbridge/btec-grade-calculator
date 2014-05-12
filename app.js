angular.module('btec-grade-calculator', ['ngRoute', 'ui.bootstrap', 'UserApp']).

config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {templateUrl: 'partials/login.html', login: true});
	$routeProvider.when('/signup', {templateUrl: 'partials/signup.html', public: true});
	$routeProvider.when('/verify-email', {templateUrl: 'partials/verify-email.html', verify_email: true});
	$routeProvider.when('/reset-password', {templateUrl: 'partials/reset-password.html', public: true});
	$routeProvider.when('/set-password', {templateUrl: 'partials/set-password.html', set_password: true});
	$routeProvider.otherwise({redirectTo: '/', public: false});
}])
.run(function($rootScope, user) {
	// Initiate the user service with your UserApp App Id
	// https://help.userapp.io/customer/portal/articles/1322336-how-do-i-find-my-app-id-
	user.init({ appId: '536674c0c9664' });
});


function ListCtrl($scope, $modal, $filter) {
  
  $scope.units = [
    {name: 'maths', level: 2, units: 5, grade: 'P', id: _.uniqueId()},
    {name: 'stats', level: 2, units: 5, grade: 'M', id: _.uniqueId()},
  ];
  
  var dialogOptions = {
    controller: 'EditCtrl',
    templateUrl: 'unitEdit.html'
  };

  $scope.edit = function(unit){
    
    var unitToEdit = unit;
    
    $modal.open({
    	templateUrl: 'unitEdit.html',
    	controller: 'EditCtrl',
    	resolve: {unit: angular.copy(unitToEdit)}
		})
    	
      .then(function(result) {
        if(result) {
          angular.copy(result, unitToEdit);                
        }
        unitToEdit = undefined;
    	});
  };

  $scope.delete = function(unit) {
  		$scope.units = $filter('filter')($scope.units, function(x) { return x.id != unit.id });
  }  
  
  $scope.addunit = function() {
  	
    var newunit = {name: '', level: 3, units: 10, grade:'', id: _.uniqueId()};

    $modal.open({
    	templateUrl: 'unitEdit.html',
    	controller: 'EditCtrl',
    	resolve: {unit: angular.copy(unitToEdit)}
      })
    	
      .then(function(result) {
        if(result) {
          angular.copy(result, unitToEdit);                
        }
        unitToEdit = undefined;
    	});
    
  }
}

// the dialog is injected in the specified controller

function EditCtrl($scope, unit, dialog){
  
  $scope.unit = unit;
  
  $scope.save = function() {
    dialog.close($scope.unit);
  };
  
  $scope.close = function(){
    dialog.close(undefined);
  };
}