smartApp.controller("mainController", ['$scope', function ($scope) {
    $scope.displayPage = "/html/notes.html";
    $scope.displayReminder = function () {
        $scope.displayPage = "/html/reminder.html";
    }
    
    $scope.displayNotes = function () {
        $scope.displayPage = "/html/notes.html";
    }
}]);

function edit(element) {
    var parent = $('#' + element).parent().parent();
    var placeholder = $(parent).find('#lbl-id-' + element).val();
    $(parent).find('#lbl-id-' + element).hide();
    var input = $(parent).find('#input-id-' + element);
    $(input).show();
    $(input).focus();
    $(parent).find('#' + element).hide();
    $(parent).find('#lbl-action-id-' + element).css({ "background-image": "url(/images/delete_black.png)" });
    $(parent).find('#update-label-' + element).show();
}

function inputFocusLost(element) {
    debugger;
    var id1 = element.replace(/[^\d.]/g, '');
    var id = id1;
    var parent = $('#' + id).parent().parent();
    debugger;
    var value = $('#input-id-' + id).val();
    if ($('#input-id-' + id).val() == "") {
        debugger;
        $(parent).find('#input-id-' + id).hide();
        $(parent).find('#lbl-id-' + id).show();
        $(parent).find('#lbl-action-id-' + id).css({ "background-image": "url(/images/label_black.png)" });
    } else {
        debugger;
    }
}