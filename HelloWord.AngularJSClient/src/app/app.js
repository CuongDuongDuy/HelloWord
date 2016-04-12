(function() {
    'use strict';

    var dataStore = angular.module('helloWordApp.dataStore',[]);

    var resourceApi = 'http://localhost:63238';

    dataStore.constant('resourceLinks', {
        enrollment: resourceApi + '/enrollments',
        channel: resourceApi + '/channels'
    });

    var app = angular.module('helloWordApp', ['ngSanitize', 'ngRoute','helloWordApp.dataStore']);
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
}());



