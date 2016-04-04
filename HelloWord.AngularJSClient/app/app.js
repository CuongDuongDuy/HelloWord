var app = angular.module('myApp', ['ngSanitize','ngRoute' ]);
app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/tab',
            {
                templateUrl:'partials/customTab.html',
                controller: 'customTabController'
            })
        .when('/tab/:tabId?',
            {
                templateUrl:'partials/customTab.html',
                controller: 'customTabController',
                reloadOnSearch: false
            })
}]);

