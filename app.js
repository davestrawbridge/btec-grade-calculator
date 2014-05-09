angular.module('btec-grade-calculator', ['ui.bootstrap']);

function ListCtrl($scope, $dialog, $filter) {
  
  $scope.units = [
    {name: 'foo', value: 'foo value', id: _.uniqueId()},
    {name: 'bar', value: 'bar value', id: _.uniqueId()},
    {name: 'baz', value: 'baz value', id: _.uniqueId()}
  ];
  
  var dialogOptions = {
    controller: 'EditCtrl',
    templateUrl: 'unitEdit.html'
  };

  $scope.edit = function(unit){
    
    var unitToEdit = unit;
    
    $dialog.dialog(angular.extend(dialogOptions, {resolve: {unit: angular.copy(unitToEdit)}}))
      .open()
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
  	
    var newunit = {name: 'unit', value: 'unit value', id: _.uniqueId()};
    
    $dialog.dialog(angular.extend(dialogOptions, {resolve: {unit: angular.copy(newunit)}}))
      .open()
      .then(function(result) {
        if(result) {
          //angular.copy(result, newunit);
          $scope.units.push(result);
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