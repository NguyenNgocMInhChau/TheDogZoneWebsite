var app = angular.module("dogzone", ['firebase']);

app.service("DataObject",function($firebaseObject) {
			var ref = new Firebase("https://dogzone.firebaseio.com/");
			var DataObject = $firebaseObject(ref);
			return DataObject;
		});
		

//Viết service getChild() cho info
app.controller("home",['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
			$scope.$watch('url', function () {
				console.log("send link " + $scope.url);			
				localStorage.setItem("prePage",$scope.url);					
			});
			$scope.clickLogout = function () {
				$scope.ref = new Firebase("https://dogzone.firebaseio.com")
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
				$scope.isLoged = localStorage.getItem("isLoged");
				$scope.$evalAsync();
			};
		}]);
		

app.controller("topic", ['$scope', '$firebaseObject', 'DataObject', function($scope, $firebaseObject, DataObject){
			DataObject.$bindTo($scope, "info");
			$scope.$watch('url', function () {
				console.log("send link " + $scope.url);			
				localStorage.setItem("prePage",$scope.url);					
			});
			$scope.clickLogout = function () {
				$scope.ref = new Firebase("https://dogzone.firebaseio.com")
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
				$scope.isLoged = localStorage.getItem("isLoged");
				$scope.$evalAsync();
			};
		}]);
		

app.controller("login",['$scope', '$firebase', '$firebaseObject', 'DataObject','$window',
				function($scope,$firebase, $firebaseObject, DataObject, $window){
			DataObject.$bindTo($scope, "info");
			var log = false;
			log = localStorage.getItem("isLoged");
			if (log == true){
				alert("You have been loged in!");
				$window.location.href = "index.html";
			}
				
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
						$scope.path = "index.html";
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
			
			$scope.clickLogout = function () {
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
			};
			$scope.ClickSignupBtn = function(){
				$window.location.href ="signup.html";
			}
}]);

app.controller("signup",['$scope', '$firebaseObject', 'DataObject','$window', function($scope, $firebaseObject, DataObject,$window){
			DataObject.$bindTo($scope, "info");
			//Neu da dang nhap, tro ve trang chu
			var log = false;
			log =localStorage.getItem("isLoged");
			if (log == true){
				alert("You have been loged in!");
				$window.location.href = "index.html";
			}		
			$scope.ClickLoginBtn = function(){
				$window.location.href = "login.html";
			};			
			$scope.ClickSignupBtn = function () {
				if($scope.email != null)
				{
					if ($scope.password === $scope.repassword && $scope.password != null )
					{
						$scope.ref = new Firebase("https://dogzone.firebaseio.com");
						$scope.ref.createUser({
							email: $scope.email,
							password: $scope.password
						}, function (error, userData) {
							if (error) {
								console.log("Error creating user:", error);
								alert("Please change email")
							} else {
								console.log("Successfully created user account with uid:", userData.Email);
								alert("Successfully created user account!")
								$window.location.href = "login.html";
							}
						});
						$scope.$evalAsync();
					}
					else{
						$scope.message = "Enter password and repassword again!";
					}
				}
				else{
					$scope.message = "Please enter email!";
				}
			
			};
			
			$scope.clickLogout = function () {
				$scope.ref = new Firebase("https://dogzone.firebaseio.com");
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
				$scope.isLoged = localStorage.getItem("isLoged");
				$scope.$evalAsync();
			};
			
		}]);
		
app.controller("breed",['$scope', '$firebaseObject', 'DataObject','$firebase', '$firebaseArray',
				function($scope, $firebaseObject, DataObject, $firebase,$firebaseArray){
			DataObject.$bindTo($scope, "info");
			$scope.isLoged = localStorage.getItem("isLoged"); 
			$scope.$watch('url', function () {
				console.log("send link " + $scope.url);			
				localStorage.setItem("prePage",$scope.url);					
			});
			
			$scope.type = "";
					
			$scope.clickLogout = function () {
				$scope.ref = new Firebase("https://dogzone.firebaseio.com");
				$scope.ref.unauth();
				localStorage.setItem("isLoged", false);
				alert("Log out!");
				$scope.isLoged = localStorage.getItem("isLoged");
				$scope.$evalAsync();
			};
			
			$scope.ClickBtnCommit = function(){
				console.log("num: "+ $scope.num);
				var ref = new Firebase("https://dogzone.firebaseio.com/"+'breeds/'+$scope.num+'/comments');
				
				console.log($scope.comments);
				console.log($scope.comment);
				//var sync = $firebase(ref);	
				var mycomment = $scope.comment;
				$scope.comments = $firebaseArray(ref)
				var temp = {
					comment: mycomment 
				};
				$scope.comments.$add(temp);
				
				
				
			}
			
			
		}]);			


		

		




