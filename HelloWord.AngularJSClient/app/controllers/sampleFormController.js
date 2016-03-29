app.controller('sampleFormController', function ($scope, dataStoreService) {
	$scope.enrollment = new Object();

	$scope.persons = [];
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
	        });
		    $scope.doShow = true;
		}
	};

	$scope.init = function() {
	    dataStoreService.getChannels().success(function (data, status) {
	        $scope.channels = data;
	    });
	}
});