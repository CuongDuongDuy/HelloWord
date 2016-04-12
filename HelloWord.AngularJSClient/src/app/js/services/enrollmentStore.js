(function() {
    'use strict';

    var app = angular.module('helloWordApp.dataStore');

    app.factory('enrollmentStore', [
        '$http', 'resourceLinks', function($http, resourceLinks) {
            var factory = {};
            factory.doRegistration = function(data) {
                var promise = $http({
                    method: 'POST',
                    url: resourceLinks.enrollment,
                    data: data
                });
                return promise;
            };

            factory.getEnrollments = function() {
                var promise = $http({
                    method: 'GET',
                    url: resourceLinks.enrollment
                });
                return promise;
            };
            return factory;
        }
    ]);
}());
