var smartApp = angular.module("smartApp", ['ngAnimate', 'ui.bootstrap', 'ngRoute', 'ngResource']);
smartApp.controller("loginController", function ($scope, $http, $window, $location) {
    $scope.isLoginInProgress = false;
    localStorage.clear();
    //$http = Common.ifIE9($http);
    $scope.username ="";
    $scope.password = ""
    $scope.loginCheckService = function () {
        $scope.isLoginInProgress = true;
        var login = {
            "username": $scope.user.username,
            "password": $scope.user.password
        };
        var url = "http://54.199.244.49/auth/login/";
        $http({
            method: 'POST',
            url: url,
            data: login
        }).then(function successCallback(data) {
            try {
                if (data != null && data.data.Token) {
                    console.log("Your Token: " + data.data.Token);
                    localStorage.accessToken = data.data.Token;
                    $window.location.href = "../html/home.html";
                } else {
                    console.log("incorrect login or pass");
                }
            } catch (exception) {
                console.log("Exceptiom" + exception);
            }
        }, function errorCallback(response) {
            //TODO: Handle on error

        });
    };
    $scope.loginCheck = function () {
        $scope.username = $scope.user.username;
        $scope.password = $scope.user.password;
        debugger;
        if ($scope.username && $scope.password) {
            $scope.loginCheckService();
        }

    };
});