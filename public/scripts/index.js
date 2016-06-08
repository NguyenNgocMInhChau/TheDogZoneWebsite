var app = angular.module("dogzone", ['firebase']);

app.service("DataObject",function($firebaseObject) {
			var ref = new Firebase("https://dogzone.firebaseio.com/");
			var DataObject = $firebaseObject(ref);
			return DataObject;
		});
app.controller("home",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("topic", ['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("home",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
			
			
		}]);
			
app.controller("americanEskimo",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
			$scope.isLoged = localStorage.getItem("isLoged");            
			localStorage.setItem("prePage","01-american-eskimo.html");
			console.log("send link ");
			
			$scope.clickLogout = function () {
				$scope.ref = new Firebase("https://dogzone.firebaseio.com")
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
				$scope.isLoged = localStorage.getItem("isLoged");
				$scope.$evalAsync();
			};
		}]);			
		
app.controller("bichonFrise",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("login",['$scope', '$firebase', '$firebaseObject', 'DataObject','$window',
				function($scope,$firebase, $firebaseObject, DataObject, $window){
			DataObject.$bindTo($scope, "info");
			
			
				
			// Create a callback which logs the current auth state
			function authDataCallback(authData) {
				if (authData) {
					console.log("User " + authData.uid + " is logged in with " + authData.provider);
				} else {
					console.log("User is logged out");
				}
				$scope.$evalAsync();
			};
			
			function authHandler(error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
					localStorage.setItem("isLoged", false);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
					localStorage.setItem("isLoged", true);
					alert("Log in successfully!");
					$scope.path = localStorage.getItem("prePage");
					if($scope.path == '')
					{
						$scope.path = $scope.info.sidebar.home;
					}
					$window.location.href = $scope.path;
					
                }
            }
			
			$scope.ClickLoginBtn = function () {
                $scope.ref = new Firebase("https://dogzone.firebaseio.com");
                $scope.ref.onAuth(authDataCallback);
				localStorage.setItem("ref", $scope.ref);
                $scope.ref.authWithPassword({
                    email: $scope.email,
                    password: $scope.password
                }, authHandler);

            };
			
			/*$scope.logout() = function () {
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
			};*/
}]);

