app.factory('dataStoreService', function ($http) {
    var service = {};
    service.doRegistration = function (data) {
        var promise = $http({
            method: 'POST', url: 'http://localhost:63238/api/enrollments', data: data
        });
        return promise;
    }

    service.getChannels = function () {
        var promise = $http({
            method: 'GET', url: 'http://localhost:63238/api/channels'
        });
        return promise;
    }

    service.getEnrollments = function () {
        var promise = $http({
            method: 'GET', url: 'http://localhost:63238/api/enrollments'
        });
        return promise;
    }
    return service;
});