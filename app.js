angular.module('btec-grade-calculator', ['ui.bootstrap']);

function ListCtrl($scope, $dialog, $filter) {
  
  $scope.items = [
    {name: 'foo', value: 'foo value', id: _.uniqueId()},
    {name: 'bar', value: 'bar value', id: _.uniqueId()},
    {name: 'baz', value: 'baz value', id: _.uniqueId()}
  ];
  
  var dialogOptions = {
    controller: 'EditCtrl',
    templateUrl: 'itemEdit.html'
  };

  $scope.edit = function(item){
    
    var itemToEdit = item;
    
    $dialog.dialog(angular.extend(dialogOptions, {resolve: {item: angular.copy(itemToEdit)}}))
      .open()
      .then(function(result) {
        if(result) {
          angular.copy(result, itemToEdit);                
        }
        itemToEdit = undefined;
    });
  };

  $scope.delete = function(item) {
  		$scope.items = $filter('filter')($scope.items, function(x) { return x.id != item.id });
  }  
  
  $scope.addItem = function() {
  	
    var newItem = {name: 'item', value: 'item value', id: _.uniqueId()};
    
    $dialog.dialog(angular.extend(dialogOptions, {resolve: {item: angular.copy(newItem)}}))
      .open()
      .then(function(result) {
        if(result) {
          //angular.copy(result, newItem);
          $scope.items.push(result);
        }
        itemToEdit = undefined;
    });
  }
}

// the dialog is injected in the specified controller

function EditCtrl($scope, item, dialog){
  
  $scope.item = item;
  
  $scope.save = function() {
    dialog.close($scope.item);
  };
  
  $scope.close = function(){
    dialog.close(undefined);
  };
}