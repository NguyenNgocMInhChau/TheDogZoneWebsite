var app = angular.module("dogzone", ['firebase']);

app.service("DataObject",function($firebaseObject) {
			var ref = new Firebase("https://dogzone.firebaseio.com/");
			var DataObject = $firebaseObject(ref);
			return DataObject;
		});
		


//Viết service getChild() cho info
app.controller("home",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("topic", ['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("americanEskimo",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
			
			
		
app.controller("bichonFrise",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
		}]);
		
app.controller("login",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
			
			$scope.GoogleLogin = function(){
				var ref = new Firebase("https://dogzone.firebaseio.com/");
				ref.authWithOAuthPopup("google", function(error, authData) {
				  if (error) {
					console.log("Login Failed!", error);
				  } else {
					console.log("Authenticated successfully with payload:", authData);
				  }
				});
			}
		}]);