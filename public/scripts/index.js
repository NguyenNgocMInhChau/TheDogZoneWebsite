var app = angular.module("dogzone", ['firebase']);

//Viết service getChild() cho info
app.controller("home", function ($scope, $firebase) {
			$scope.$myRef = $firebase(new Firebase('https://dogzone.firebaseio.com/'));
			$scope.info = [];
			$scope.$myRef.$bind($scope, "info").then(function(unbind) {
                  $scope.unbindFunction = unbind;
			});			
			$scope.Logout = function () {
			    console.log("Log out!");
			    sc.$evalAsync();

			}   
			
		});
		
app.controller("topic", function ($scope, $firebase) {
			$scope.$myRef = $firebase(new Firebase('https://dogzone.firebaseio.com/'));
			$scope.info = [];
			$scope.$myRef.$bind($scope, "info").then(function(unbind) {
                  $scope.unbindFunction = unbind;
			});		
			
		});
		
app.controller("americanEskimo", function ($scope, $firebase) {
			$scope.$myRef = $firebase(new Firebase('https://dogzone.firebaseio.com/'));
			$scope.info = [];
			$scope.$myRef.$bind($scope, "info").then(function(unbind) {
                  $scope.unbindFunction = unbind;
			});		

			//Chức năng đăng nhập để comment
			
		});