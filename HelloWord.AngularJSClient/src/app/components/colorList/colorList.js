(function () {
    'use strict';
    var app = angular.module('helloWordApp');
    app.directive('colorList', function ($compile) {
        return {
            restrict: 'AE',
            template: "<button ng-click='showHideColors()' type='button'>{{isHidden ? 'Show Available Colors' : 'Hide Available Colors'}}</button>" + "<div ng-hide='isHidden' id='colorContainer'></div>",
            link: function ($scope, $element) {
                $scope.isHidden = true;
                $scope.showHideColors = function () {
                    $scope.isHidden = !$scope.isHidden;
                };
                var colorContainer = '';
                angular.forEach($scope.colorsArray, function (color) {
                    var appendString = "<div style='background-color:" + color + "'>" + color.toUpperCase() + "</div>";
                    colorContainer += appendString;
                });
                $element.find('div').append(colorContainer);
            }
        };
    });
}());

