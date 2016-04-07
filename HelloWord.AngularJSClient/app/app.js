var app = angular.module('helloWordApp', ['ngSanitize', 'ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/tab',
            {
                templateUrl: 'app/customTab/customTab.html',
                controller: 'customTabController'
            })
        .when('/tab/:tabId?',
            {
                templateUrl: 'app/customTab/customTab.html',
                controller: 'customTabController',
                reloadOnSearch: false
            });
}]);


