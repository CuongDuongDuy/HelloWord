(function () {
    'use strict';

    var app = angular.module('helloWordApp.directive');

    app.directive('tab', function () {
        var controller = [
            '$routeParams', '$scope', function ($routeParams, $scope) {
                $scope.tabAdd = function (tab, tabsetCtrl) {
                    if ($routeParams.tabId === undefined) {
                        tabsetCtrl.tabAdd(tab);
                    }
                };
            }
        ];
        return {
            restrict: 'E',
            require: '^tabset',
            replace: true,
            transclude: true,
            templateUrl: 'views/tabset/tab.html',
            scope: {},
            link: function (scope, elem, attr, tabsetCtrl) {
                scope.content = elem.html();
                scope.tabAdd(scope, tabsetCtrl);
            },
            controller: controller
        };
    });
}());