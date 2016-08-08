smartApp.factory('notesService', ['$http', function ($http, $scope) {
    var url = "http://54.199.244.49/todo/note/";
    var headers = {
        "Authorization": "Token " + localStorage.accessToken
    };
    var labelData = {};
    return {
        getNotesFromServer: function () {
            return $http({
                method: 'GET',
                url: url,
                headers: headers
            }).success(function (response) {
                console.log("Got Notes' data successfully: %o", response);
                return response.data;
            }).error(function errorCallback(error) {
                //TODO: Handle on error
                console.log("in error %o", error);
            });
        },
        addNotesToServer: function (noteInfo) {
            var res = $http({
                method: 'POST',
                url: url,
                data: noteInfo,
                headers: headers
            });
            return res;
        },
        deleteNoteOnServer: function (noteIdS) {
            var res = $http({
                method: 'DELETE',
                url: url + noteIdS + "/",
                headers: headers
            });
            return res;
        }
    }
}]);