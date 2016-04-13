(function() {
    'use strict';
    var app = angular.module('helloWordApp');
    app.factory('tabStore', ['$http', function ($http) {
        var service = {};
        service.tabs = [];
        service.newTabId = 1;
        service.selectedTab = undefined;
        return service;
    }]);
}());

