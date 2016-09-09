﻿app.controller("homeController", function ($state ,alert, searchDialogue, searchService) {
    var vm = this;
    vm.search;
    vm.visitManagerModal = function () {
        //alert.visitManager();
        searchDialogue.searchPatient();
    }

    vm.getDetails = function () {

     
        var getData = searchService.SearchPatient(vm.search);
        getData.then(function (response) {
            if (response.data !== 'False') {
                $state.go('consultPatientInfo')
                
            } else {
              
                alert.warning('patient dont exist,//replace with ng-show');
            }
           
        }, function () {
            alert.warning('Error in getting records');
        });
    }

});




app.factory('searchService', function ($http) {
    var fac = {};

    fac.SearchPatient = function (id) {
       
        return $http.get('../Home/Search?search=' + id)
    }

    return fac;
});