(function(angular) {
var myApp = angular.module('article-slimmer', []);

myApp.controller('SmmryController', ['$scope', '$http', function($scope, $http) {
    var key = "720A501981";
    $scope.articleData = {
      url: "",
      rawData: "",
      dataObject: {},
      charCount: 0,
      title: "",
      content: "",
      remainingRequests: 0
    };
    $scope.title = "Article Slimmer";
    $scope.secondaryTitle = "Powered by Smmry";
    $scope.pageTitle = "Create A Summary";
    $scope.url1 = "";
    $scope.myFunction = function(){
        if(!$scope.articleData.url) alert("Please include a URL");
        else{
        $http({
          method: 'GET',
          url: `http://api.smmry.com/?SM_API_KEY=${key}&SM_URL=${$scope.articleData.url}`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': "application/json, text/plain, */*",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization"
          }
        }).then(function successCallback(response) {
            $scope.articleData.rawData = response;
            $scope.articleData.dataObject = Object.assign(response.data);
            console.log($scope.articleData.dataObject);
            $scope.articleData.charCount = $scope.articleData.dataObject.sm_api_character_count;
            $scope.articleData.title = $scope.articleData.dataObject.sm_api_title;
            $scope.articleData.content = $scope.articleData.dataObject.sm_api_content;
            $scope.articleData.remainingRequests = $scope.articleData.dataObject.sm_api_limitation;
            $scope.articleData.url = "";
          }, function errorCallback(response) {
            alert("Error occurred. Please try again!");
            console.log("Error ",response);
            //$scope.articleData.rawData = response;
            //$scope.articleData.url = "";
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        }
    };
}]);

})(window.angular);

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/