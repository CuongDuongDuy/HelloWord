(function() {
    'use strict';

    var app = angular.module('helloWordApp', ['ngSanitize', 'ngRoute']);
    app.config([
        '$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/tab',
                {
                    templateUrl: 'views/customTab/customTab.html',
                    controller: 'customTabController'
                })
                .when('/tab/:tabId?',
                {
                    templateUrl: 'views/customTab/customTab.html',
                    controller: 'customTabController'
                })
                .when('/form', {
                    templateUrl: 'views/sampleForm/sampleForm.html',
                    controller: 'sampleFormController',
                    controllerAs: 'sampleFormCtrl'
                });
        }
    ]);

    var resourceApi = 'http://localhost:63238';
    app.constant('resourceLinks', {
        enrollment: resourceApi + '/enrollments',
        channel: resourceApi + '/channels'
    });

}());



