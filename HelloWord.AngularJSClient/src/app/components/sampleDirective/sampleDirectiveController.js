(function() {
    "use strict";

    app.controller('sampleDirectiveController', function ($scope) {
        $scope.isHidden = true;
        $scope.colorsArray = ['red', 'green', 'blue', 'purple', 'olive'];

        $scope.showHideColors = function () {
            $scope.isHidden = !$scope.isHidden;
        };
    });
}());