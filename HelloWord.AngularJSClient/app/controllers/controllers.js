app.controller('MyController', ['$scope', '$http', function($scope, $http) {
    $http.get('js/data.json').success(function(data) {
        $scope.artists = data;
        $scope.artistOrder = 'name';
    });
}]);

app.controller('customTabController', [function() {
}]);

app.controller('directiveController', function($scope){
    $scope.isHidden = true;
    $scope.colorsArray = ['red', 'green', 'blue', 'purple', 'olive'];

    $scope.showHideColors = function(){
        $scope.isHidden = !$scope.isHidden;
    };
});

app.controller('sampleFormController', function ($scope, dataStoreService) {

    function updateEnrollments() {
        dataStoreService.getEnrollments().success(function (data, status) {
            $scope.enrollments = data;
        });
    };

    $scope.enrollment = {};
    $scope.enrollments = [];
    $scope.channels = [];
    $scope.register = function () {
        $scope.firstNameInvalid = !$scope.registrationForm.firstName.$valid;
        $scope.lastNameInvalid = !$scope.registrationForm.lastName.$valid;
        $scope.emailInvalid = !$scope.registrationForm.email.$valid;
        $scope.researchInvalid = !$scope.registrationForm.research.$valid;
        if ($scope.registrationForm.$valid) {
            $scope.working = true;
            $scope.enrollment.channelId = $scope.selectedChannel.id;
            var promise = dataStoreService.doRegistration($scope.enrollment);
            promise.success(function(data, status) {
                $scope.showSuccessMessage = true;
            });

            promise.error(function(data, status) {
                $scope.showErrorMessage = true;
            });
            promise.finally(function() {
                $scope.working = false;
                updateEnrollments();
            });
            $scope.doShow = true;
            $scope.enrollment = {};
        }
    };

    $scope.init = function() {
        dataStoreService.getChannels().success(function (data, status) {
            $scope.channels = data;
            updateEnrollments();
        });

    }


});