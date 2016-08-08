smartApp.controller("labelsController", function ($scope, $http, $uibModal, labelsService) {

    $scope.labelsList = [];
    
    labelsService.getLabelsFromServer().success(function (data) {
        $scope.labelsList = data;
        
    });
    $scope.animationsEnabled = true;
    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/html/popup.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                uppi: function () {
                    return $scope.labelsList;
                }
            }
        });

        modalInstance.result.then(function () {
        }, function () {
            console.log('Modal dismissed ');
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});