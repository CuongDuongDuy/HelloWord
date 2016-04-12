(function () {
    'use strict';

    var app = angular.module('helloWordApp.dataStore');
    var resourceApi = 'http://localhost:63238';

    app.constant('resourceLinks', {
        enrollment: resourceApi + '/enrollments',
        channel: resourceApi + '/channels'
    });
}());