'use strict';

var premiControllers = angular.module('premiControllers', []);





premiControllers.controller('premiLoginController', ['$rootScope', '$scope', '$location', '$localStorage', 'Main', function($rootScope, $scope, $location, $localStorage, Main) {

 $scope.master = {};

 $scope.update = function(user) {
    $scope.master.username = $scope.username;
    $scope.master.password = $scope.password;
    $scope.status = 'logged';
};

$scope.reset = function() {
    $scope.user = angular.copy($scope.master);
};


$scope.signin = function() {
    var formData = {
        email: $scope.username,
        password: $scope.password
    }

    Main.signin(formData, function(res) {
        if (res.type == false) {
            alert(res.data)    
        } else {
            $localStorage.token = res.data.token;
            window.location = "/first";    
        }
    }, function() {
        $rootScope.error = 'Failed to signin';
    })
};

$scope.signup = function() {
    var formData = {
        email: $scope.username,
        password: $scope.password
    }

    Main.save(formData, function(res) {
        if (res.type == false) {
            alert(res.data)
        } else {
            $localStorage.token = res.data.token;
            window.location = "/first"    
        }
    }, function() {
        $rootScope.error = 'Failed to signup';
    })
};

$scope.me = function() {
    Main.me(function(res) {
        $scope.myDetails = res;
    }, function() {
        $rootScope.error = 'Failed to fetch details';
    })
};

$scope.logout = function() {
    Main.logout(function() {
        window.location = "/"
    }, function() {
        alert("Failed to logout!");
    });
};
$scope.token = $localStorage.token;



$scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
  } else if (size > 3) {
      $scope.strength = 'medium';
  } else {
      $scope.strength = 'weak';
  }
};
}])

premiControllers.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {

    Main.me(function(res) {
        $scope.myDetails = res;
    }, function() {
        $rootScope.error = 'Failed to fetch details';
    })


    $scope.reset();
}]);
