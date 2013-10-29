'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.Submit = function () {
	var credentials = {
	    'username' : $scope.username,
	    'password' : CryptoJS.SHA256($scope.password).toString(CryptoJS.enc.Hex)
	};
	$http.post('login.php', credentials)
	    .success(function(data, status, header, config) {
		$scope.error = "";
		console.log(data);
	    })
	    .error(function(data, status, header, config) {
		$scope.error = data.error;
	    });
    }
  }])
  .controller('MyCtrl2', [function() {

  }]);