smartApp.factory('labelsService', ['$http', function ($http, $scope) {
    var url = "http://54.199.244.49/todo/label/";
    var headers = {
        "Authorization": "Token " + localStorage.accessToken
    };
    var labelData = {};
    return {
        getLabelsFromServer: function () {
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            }).success(function (response) {
                console.log("Got label's data successfully: %o", response);
                return response.data;
            }).error(function errorCallback(error) {
                //TODO: Handle on error
                console.log("in error %o", error);
            });
        },
        addLabelToServer: function (labelInfo) {
            debugger;
            var res = $http({
                method: 'POST',
                url: url,
                data: labelInfo,
                headers: headers
            });
            return res;

        },
        deleteLabelFromServer: function (labelIdS) {
            var res = $http({
                method: 'DELETE',
                url: url + labelIdS + "/",
                headers: headers
            });
            return res;
        },
        updateLabelOnServer: function (labelIdS, labelUpdates) {
            var res = $http({
                method: 'POST',
                url: url + labelIdS + "/",
                data: labelUpdates,
                headers: headers
            });
            return res;
        }
    }
}]);