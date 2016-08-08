smartApp.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, uppi, labelsService) {

    $scope.labelData = uppi;
    $scope.addLabel = function (obj) {
        var closeValue = obj.target.attributes.data.value;
        if (("label" in $scope) && $scope.label.name != null) {
            var labelInfo = {
                "name": $scope.label.name,
            };
            labelsService.addLabelToServer(labelInfo).success(function (data) {
                console.log("Adding label success: %o", data);
                $scope.labelData.push(data);
            }).error(function errorCallback(response) {
                //TODO: Handle on error
            });
            var parent = $('#add-lbl').parent().parent();
            var textBox = $(parent).find('.label-name-text-field').val("");
            $scope.label.name = null;
            textBox.focus();
        }
        if (closeValue == 2)
            $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.deleteLabel = function (obj) {
        var labelIdUi = (obj.target.id).replace(/[^\d.]/g, '');
        var labelIdS = (obj.target.attributes.data.value).replace(/[^\d.]/g, '');

        labelsService.deleteLabelFromServer(labelIdS).success(function (data) {
            console.log("Label deleted successfully %o", data);
        }).error(function errorCallback(response) {
            //TODO: Handle on error
        });
        $scope.labelData.splice(labelIdUi, 1);
        console.log($scope.labelData);
    };

    $scope.updateLabelInfo = function (obj) {
        var labelIdUi = (obj.target.id).replace(/[^\d.]/g, '');
        var labelIdS = (obj.target.attributes.data.value);
        var parent = $('#update-label-' + labelIdUi).parent().parent();
        var updatedLblName = $(parent.find('#input-id-' + labelIdUi)).val();

        $scope.labelData[labelIdUi]["name"] = updatedLblName;

        $(parent).find('#input-id-' + labelIdUi).hide();

        var labelUpdates = {
            "name": updatedLblName,
        };
        labelsService.updateLabelOnServer(labelIdS, labelUpdates).success(function (data) {
            console.log("Label updated successfully %o", data);
        }).error(function errorCallback(response) {
            //TODO: Handle on error
            console.log("Label update failed %o", response);
        });

        //Reset UI Components
        $(parent).find('#lbl-id-' + labelIdUi).text(updatedLblName);
        $(parent).find('#lbl-action-id-' + labelIdUi).css({ "background-image": "url(/images/label_black.png)" });
        $(parent).find('#lbl-id-' + labelIdUi).show();
        $(parent).find('#' + labelIdUi).show();
        $(parent).find('#update-label-' + labelIdUi).hide();
    };
});
