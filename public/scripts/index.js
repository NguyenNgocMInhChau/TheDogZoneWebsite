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
					$scope.message = "Email or password incorrect!";				
                } else {
                    console.log("Authenticated successfully with payload:", authData);
					localStorage.setItem("isLoged", true);
					alert("Log in successfully!");					
					$scope.path = localStorage.getItem("prePage");
					if($scope.path == '')
					{
						$scope.path = "scripts/index.html";
					}
					
					$window.location.href = $scope.path;
					
                }
            }
			
			//Nhan login button
			var myPass = $scope.password;
			var myEmail = $scope.email;
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
			
			var myRef = new Firebase("https://dogzone.firebaseio.com");
			var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
			  if (error) {
				// an error occurred while attempting login
				console.log(error);
			  } else if (user) {
				// user authenticated with Firebase
				alert("You have been loged in!");
				console.log("User ID: " + user.uid + ", Provider: " + user.provider);
			  } else {
				// user is logged out
			  }
			});
			
			$scope.ClickLoginBtn = function(){
				$window.location.href = "login.html";
			};			
			$scope.ClickSignupBtn = function () {
				if($scope.email != null)
				{
					if ($scope.password === $scope.rePassword && $scope.password != null )
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
								console.log("Successfully created user account!");
								alert("Successfully created user account!")
								$window.location.href = "login.html";
							}
						});
						$scope.$evalAsync();
					}
					else{
						$scope.message = "Repassword Incorrect!";
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
				var ref = new Firebase("https://dogzone.firebaseio.com");
				var authData = ref.getAuth();
				//console.log("User ID: " + authData.uid );
				var ref = new Firebase("https://dogzone.firebaseio.com/"+'breeds/'+$scope.num+'/comments');

				var mycomment = $scope.comment;
				$scope.comments = $firebaseArray(ref)
				var temp = {
					comment: mycomment,
					email: authData.password.email				
				};
				$scope.comment = "";
				$scope.comments.$add(temp).then(
				function(success){
				  console.log("Comment successfully");
				}, 
				function(err){
					  alert("Error: Comment box is empty!")
				});			
			}		
			
			
			$scope.ClickImg1 = function(){
				var image = document.getElementById("flip1");
				$("#panel1").slideToggle("fast");
				if (image.src.match("add")) {
					image.src = "images/subtract.png";
				} 
				else {
					image.src = "images/add.png";
				}
			}
			
			$scope.ClickImg2 = function(){
				var image = document.getElementById("flip2");
				$("#panel2").slideToggle("fast");
				if (image.src.match("add")) {
					image.src = "images/subtract.png";
				} 
				else {
					image.src = "images/add.png";
				}
			}	
			
			$scope.ClickImg3 = function(){
				var image = document.getElementById("flip3");
				$("#panel3").slideToggle("fast");
				if (image.src.match("add")) {
					image.src = "images/subtract.png";
				} 
				else {
					image.src = "images/add.png";
				}
			}	
			
			$scope.ClickImg4 = function(){
				var image = document.getElementById("flip4");
				$("#panel4").slideToggle("fast");
				if (image.src.match("add")) {
					image.src = "images/subtract.png";
				} 
				else {
					image.src = "images/add.png";
				}
			}	
			
			$scope.ClickImg5 = function(){
				var image = document.getElementById("flip5");
				$("#panel5").slideToggle("fast");
				if (image.src.match("add")) {
					image.src = "images/subtract.png";
				} 
				else {
					image.src = "images/add.png";
				}
			}	
				
		}]);			


		




