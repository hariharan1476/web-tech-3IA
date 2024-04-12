var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl:"home.html"
    })
    .when("/room", {
        templateUrl:"room.htm"
    })
    .when("/common", {
        templateUrl:"common.htm"
    })
    });

