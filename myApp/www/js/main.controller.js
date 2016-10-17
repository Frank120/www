controllers.controller('MainCtrl', function ($scope, $state) {
 $scope.goPage=function(name){
   $state.go(name);
 }
});

