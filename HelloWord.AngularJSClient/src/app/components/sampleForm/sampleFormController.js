(function () {
    'use strict';

    var app = angular.module('helloWordApp');

    app.controller('sampleFormController', ['$scope', 'channelStore', 'enrollmentStore', function ($scope, channelStore, enrollmentStore) {

        function updateEnrollments() {
            enrollmentStore.getEnrollments().success(function (data, status) {
                $scope.enrollments = data;
            });
        }

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
                var promise = enrollmentStore.doRegistration($scope.enrollment);
                promise.success(function (data, status) {
                    $scope.showSuccessMessage = true;
                });

                promise.error(function (data, status) {
                    $scope.showErrorMessage = true;
                });
                promise.finally(function () {
                    $scope.working = false;
                    updateEnrollments();
                });
                $scope.doShow = true;
                $scope.enrollment = {};
            }
        };

        $scope.init = function () {
            channelStore.getChannels().success(function (data, status) {
                $scope.channels = data;
                updateEnrollments();
            });

        };
    }]);
})();