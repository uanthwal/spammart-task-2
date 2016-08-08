smartApp.controller("notesController", function ($scope, $http, $window, $location, notesService) {
    $scope.new_note_full_div = true;
    $scope.new_note_half_div = true;
    $scope.focusOnTxtArea = false;
    $scope.open = false;
    $scope.notesList = [];
    $scope.displayFullNoteForm = function () {
        
        $scope.new_note_half_div = false;
        $scope.new_note_full_div = false;
        $scope.open = !$scope.open;
        if ($scope.open) {
            
            $window.onclick = function (event) {
                clickedOutsideCloseNewNoteFullForm(event, $scope.displayFullNoteForm);
            };
        } else {
            
            $scope.open = false;
            $window.onclick = null;
            $scope.new_note_half_div = true;
            $scope.new_note_full_div = true;
            //TODO: get the text inside the textboxes if its there create a note else ignore
            $scope.addNote(null);
            $scope.$apply();

        }

    }

    function clickedOutsideCloseNewNoteFullForm(event, callbackOnClose) {
        
        var clickedElement = event.target;
        if (!clickedElement) return;

        var elementClasses = clickedElement.classList;
        
        var clickedInsideForm = elementClasses.contains('new-note-f-title') || elementClasses.contains('new-note-f-body') || (clickedElement.parentElement !== null && clickedElement.parentElement.classList.contains('new-note-f-title'));

        if (!clickedInsideForm) {
            callbackOnClose();
            return;
        }

    }

    notesService.getNotesFromServer().success(function (data) {
        
        $scope.notesList = data;
    });

    $scope.addNote = function (obj) {
        
        var noteTitle = (angular.element(document.querySelector('#new-note-title'))).val();
        var noteBody = (angular.element(document.querySelector('#new-note-body'))).val();

        if ((noteTitle != null && noteTitle != "") || (noteBody != null && noteBody != "")) {

            var labelInfo = {
                "name": noteTitle,
                "body" : noteBody
            };
            notesService.addNotesToServer(labelInfo).success(function (data) {
                console.log("Adding note success: %o", data);
                $scope.notesList.push(data);
            }).error(function errorCallback(response) {
                //TODO: Handle on error
            });
            (angular.element(document.querySelector('#new-note-title'))).val("");
            (angular.element(document.querySelector('#new-note-body'))).val("");
            (angular.element(document.querySelector('#new-note-body'))).css({ "height": "32px" });
        }
        
    }

    $scope.deleteNote = function (obj){
        
        var noteIdS = (obj.currentTarget.id).replace(/[^\d.]/g, '');

        notesService.deleteNoteOnServer(noteIdS).success(function (data) {
                console.log("Note deleted successfully: %o", data);
            }).error(function errorCallback(response) {
                //TODO: Handle on error
            });
        var tempObj = {};
        var index;
        for(var i = 0; i< $scope.notesList.length;i++) {
            tempObj = $scope.notesList[i];
            if (tempObj.id == noteIdS) {
                index = i;
                break;
            }
        }
        
        $scope.notesList.splice(index, 1);
        console.log($scope.notesList);
        
    }
});

smartApp.directive('draggable', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            elem.draggable();
        }
    };
});