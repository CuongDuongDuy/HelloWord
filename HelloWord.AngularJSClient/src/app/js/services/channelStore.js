(function () {
    'use strict';

    var app = angular.module('helloWordApp.dataStore');

    app.factory('channelStore', [
        '$http', 'resourceLinks', function ($http, resourceLinks) {
            var factory = {};

            factory.getChannels = function () {
                var promise = $http({
                    method: 'GET',
                    url: resourceLinks.channel
                });
                return promise;
            };
            return factory;
        }
    ]);
}());
