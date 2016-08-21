﻿var tempListFamilyHistory = [];
var tempListFamilyHistoryVm = [];

var tempListRiskFactor = [];
var tempListRiskFactorVm = [];

var tempListAllergy = [];
var tempListAllergyVm = [];
app.controller("PatientFamilyHistoryController", function ($scope, $interval, PatientFactory, alert) {

    // ************** FamilyHistory *************** //
    $scope.listFamilyHistory = [];
    $scope.ListFamilyHistoryVm = [];

    $interval(function () {
        $scope.listFamilyHistory = tempListFamilyHistory;
        $scope.ListFamilyHistoryVm = tempListFamilyHistoryVm;
    }, 500);

    $scope.familyHistoryLvl1 = [];
    $scope.familyHistoryLvl2 = [];
    $scope.FamilyHistoryCategories = null;
    $scope.FamilyHistories = null;
    $scope.FamilyHistoryManagers = null;

    var familyHistories = PatientFactory.GetHistoryFactorsCategory();
    familyHistories.then(function (dt) {
        $scope.familyHistoryLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });

    $scope.processLevel2F = function () {
        PatientFactory.GetHistoryFactors($scope.FamilyHistoryCategories.FamilyHistoryCategoryId).then(function (dt) {
            $scope.familyHistoryLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    $scope.processLevel3 = function () {
        var ViewModel = new Object();
        ViewModel.Name = $scope.FamilyHistories.FamilyHistoryName;
        ViewModel.Carrier = $scope.FamilyHistoryManagers;
        tempListFamilyHistoryVm.push(ViewModel);

        var FamilyHistoryManager = new Object();
        FamilyHistoryManager.Carrier = $scope.FamilyHistoryManagers;
        FamilyHistoryManager.FamilyHistoryManagerFamilyHistoryId = $scope.FamilyHistories.FamilyHistory_id;
        tempListFamilyHistory.push(FamilyHistoryManager);
    }

    $scope.saveHistoryFactors = function () {
        if ($scope.listFamilyHistory.length > 0) {
            var getData = PatientFactory.saveFamilyHistory($scope.listFamilyHistory);
            getData.then(function (message) {
                //alert("Success");
                alert.success("Family Histories added with Sucess!");
                tempListFamilyHistory = [];
                tempListFamilyHistoryVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteFamilyHistory = function (element) {
        $scope.ListFamilyHistoryVm.splice($scope.ListFamilyHistoryVm.indexOf(element), 1);
        $scope.listFamilyHistory.splice($scope.listFamilyHistory.indexOf(element), 1);
    }

});



app.controller("PatientRiskFactorsController", function ($scope, $interval, PatientFactory, alert) {

    // ************** RiskFactors *************** //
    $scope.listRiskFactor = [];
    $scope.ListRiskFactorVm = [];

    $interval(function () {
        $scope.listRiskFactor = tempListRiskFactor;
        $scope.listRiskFactorVm = tempListRiskFactorVm;
    }, 500);

    $scope.riskFactorsLvl1 = [];
    $scope.riskFactorsLvl2 = [];
    $scope.RiskFactorsCategories = null;
    $scope.RiskFactors = null;
    $scope.RiskFactorsManagers = null;

    var risks = PatientFactory.GetRiskFactorsCategory();
    risks.then(function (dt) {
        $scope.riskFactorsLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });


    $scope.processLevel2R = function () {
        PatientFactory.GetRiskFactors($scope.RiskFactorsCategories.RiskFactorsCategoryId).then(function (dt) {
            $scope.riskFactorsLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });
    }

    $scope.processLevel3R = function () {
        var ViewModelRisk = new Object();
        ViewModelRisk.Name = $scope.RiskFactors.RiskFactorName;
        tempListRiskFactorVm.push(ViewModelRisk);

        var RiskFactorsManagers = new Object();
        RiskFactorsManagers.RiskFactorsManagerRiskFactorId = $scope.RiskFactors.RiskFActors_id;
        tempListRiskFactor.push(RiskFactorsManagers);
    }

    $scope.saveRiskFactor = function () {
        if ($scope.listRiskFactor.length > 0) {
            var getData = PatientFactory.saveRiskFactors($scope.listRiskFactor);
            getData.then(function (message) {
                alert.success("Risk Factors added with Sucess!");
                tempListRiskFactor = [];
                tempListRiskFactorVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteRiskFactor = function (element) {
        $scope.listRiskFactor.splice($scope.listRiskFactor.indexOf(element), 1);
        $scope.listRiskFactorVm.splice($scope.listRiskFactorVm.indexOf(element), 1);
    }

});



app.controller("PatientAllergiesController", function ($scope, $interval, PatientFactory, alert) {

    // ************** Allergies *************** //

    $scope.listAllergy = [];
    $scope.listAllergyVm = [];

    $interval(function () {
        $scope.listAllergy = tempListAllergy;
        $scope.listAllergyVm = tempListAllergyVm;
    }, 500);

    $scope.allergiesLvl1 = [];
    $scope.allergiesLvl2 = [];
    $scope.AllergyCategories = null;
    $scope.Allergies = null;
    $scope.AllergiesManager = null;

    var allergies = PatientFactory.GetAllergiesCategory();
    allergies.then(function (dt) {
        $scope.allergiesLvl1 = dt.data;
    }, function (error) {
        alert.warning("Something went wrong while getting the records ! Please try again. ");
    });


    $scope.processLevel2A = function () {
        PatientFactory.GetAllergies($scope.AllergyCategories.AllergyCategoryId).then(function (dt) {
            $scope.allergiesLvl2 = dt.data;
        }, function (error) {
            alert.warning("Something went wrong while getting the records ! Please try again. ");
        });

    }

    $scope.processLevel3A = function () {
        var ViewModelAllergy = new Object();
        ViewModelAllergy.AllergyName = $scope.Allergies.Allergy_Name;
        //ViewModelAllergy.StartDate = $scope.AllergiesManager.Allergy_start_date;
        //ViewModelAllergy.EndDate = $scope.AllergiesManager.Allergy_end_date;
        tempListAllergyVm.push(ViewModelAllergy);

        var AllergiesManager = new Object();
        AllergiesManager.AllergiesManager_AllergiesId = $scope.Allergies.Allergy_id;
        //AllergiesManager.Allergy_start_date = $scope.AllergiesManager.Allergy_start_date;
        //AllergiesManager.Allergy_end_date = $scope.AllergiesManager.Allergy_end_date;
        tempListAllergy.push(AllergiesManager);
    }

    $scope.saveAllergy = function () {
        if ($scope.listAllergy.length > 0) {
            var getData = PatientFactory.saveAllergies($scope.listAllergy);
            getData.then(function (message) {
                alert.success("Allergies added with Sucess!");
                tempListAllergy = [];
                tempListAllergyVm = [];
            }, function () {
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

    $scope.deleteAllergy = function (element) {
        $scope.listAllergy.splice($scope.listAllergy.indexOf(element), 1);
        $scope.listAllergyVm.splice($scope.listAllergyVm.indexOf(element), 1);
    }

});



var patientDetails = [];
app.controller("PatientController", function ($scope, alert, PatientFactory) {

    $scope.Users = null;
    $scope.Aux = false;

    $scope.elemReady = function () {
        var getData = PatientFactory.GetPatientInformations();
        getData.then(function (dt) {
            $scope.Users = dt.data;
            $scope.Users.Email = dt.data[0];
            $scope.Users.Telephone = dt.data[1];
            $scope.Users.Address = dt.data[2];
            if (dt.data[0] && dt.data[1] && dt.data[2]) {
                $scope.Aux = true;
            }
        }, function (error) {
            alert("Erro aqui ");
        });
    }

    $scope.savePatientData = function () {
        var Patient = new Object();
        Patient.Email = $scope.Users.Email;
        Patient.Telephone = $scope.Users.Telephone;
        Patient.Address = $scope.Users.Address;

        patientDetails.push(Patient);

        if (patientDetails.length > 0) {
            var getData = PatientFactory.savePatientInformations(patientDetails);
            getData.then(function (message) {
                alert.success("Patient info added with success !");
                patientDetails = [];
                $scope.Aux = true;
            }, function () {
                //alert("error");
                alert.warning("Something went wrong ! Please try again. ");
            });
        }
    }

});



app.factory('PatientFactory', function ($http) {
    var fac = {};
    fac.GetAllergiesCategory = function () {
        return $http.get('../Patient/GetAllergiesCategoryJson');
    }

    fac.GetAllergies = function (allergyCategory) {
        return $http.get('../Patient/GetAllergiesJson?categoryId=' + allergyCategory);
    }

    fac.GetRiskFactorsCategory = function () {
        return $http.get('../Patient/GetRiskFactorsCategoryJson');
    }

    fac.GetRiskFactors = function (riskFactorsCategory) {
        return $http.get('../Patient/GetRiskFactorsJson?categoryId=' + riskFactorsCategory);
    }

    fac.GetHistoryFactorsCategory = function () {
        return $http.get('../Patient/GetFamilyHistoryCategoryJson');
    }

    fac.GetHistoryFactors = function (familyHistoryCategory) {
        return $http.get('../Patient/GetFamilyHistoryJson?categoryId=' + familyHistoryCategory);
    }

    // ****************** Save Data ************************ //

    fac.saveFamilyHistory = function (listFamilyHistories) {
        var historyFamilyList = JSON.stringify({ 'familyHistory': tempListFamilyHistory });
        var response = $http({
            method: "post",
            url: "../Patient/SaveFamilyHistory",
            data: historyFamilyList,
            dataType: "json",
        });
        return response;
    }


    fac.saveRiskFactors = function (listRiskFactors) {
        var riskFactorsList = JSON.stringify({ 'riskFactors': tempListRiskFactor });
        var response = $http({
            method: "post",
            url: "../Patient/SaveRiskFactors",
            data: riskFactorsList,
            dataType: "json",
        });
        return response;
    }


    fac.saveAllergies = function (listAllergies) {
        var allergiesList = JSON.stringify({ 'allergies': tempListAllergy });
        var response = $http({
            method: "post",
            url: "../Patient/SaveAllergies",
            data: allergiesList,
            dataType: "json",
        });
        return response;
    }

    // ************* Get Patient Informations *********************** //

    fac.GetPatientInformations = function () {
        return $http.get('../Patient/GetPatientInformation');
    }

    // ************* Save Patient Informations ********************* //

    fac.savePatientInformations = function (listInformations) {
        var informations = JSON.stringify({ 'usersInformations': patientDetails });
        var response = $http({
            method: "post",
            url: "../Patient/SaveInformations",
            data: informations,
            dataType: "json",
        });
        return response;
    }

    return fac;
});

