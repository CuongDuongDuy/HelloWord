(function() {
    "use strict";
    var app = angular.module('helloWordApp');
    app.controller('artistController', [
        '$scope', '$http', function($scope, $http) {
            $http.get('js/data.json').success(function(data) {
                $scope.artists = data;
                $scope.artistOrder = 'name';
            });
        }
    ]);
}());