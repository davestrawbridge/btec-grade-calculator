angular.module('btec-grade-calculator', ['ui.bootstrap']);

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