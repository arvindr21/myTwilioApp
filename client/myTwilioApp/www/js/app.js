angular.module('mytwilioapp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('API', function($http) {
  var api = {};
  var baseURL = 'http://5935c388.ngrok.com';

  api.sendMsg = function(to, text) {
    return $http.post(baseURL + '/sendmsg', {
      "to": to,
      "text": text
    });
  };

  api.triggerCall = function(to) {
    return $http.post(baseURL + '/triggercall', {
      "to": to
    });
  };

  return api;
})

.controller('AppCtrl', function($scope, $ionicLoading, $ionicPopup, API) {

  $scope.processing = false;

  $scope.show = function(message) {
    $ionicLoading.show({
      template: message
    });
  };

  $scope.hide = function() {
    $ionicLoading.hide();
  };

  $scope.showAlert = function(msg) {
    $ionicPopup.alert({
      title: msg.title,
      template: msg.message,
      okText: 'Cool',
      okType: 'button-assertive'
    });
  };

  $scope.sendMessage = function() {
    $scope.processing = true;
    $scope.show('Sending Message...');
    API.sendMsg($scope.msgTo, $scope.msgText).then(function(data) {

      if (data.data.status == 'success') {
        $scope.msgTo = '';
        $scope.msgText = '';
        $scope.showAlert({
          title: "Success",
          message: "Message sent successfully"
        });
      } else {
        $scope.showAlert({
          title: "Oops!!",
          message: "Oops something went wrong! Please try again later."
        });
      }
      $scope.hide();
      $scope.processing = false;

    });

  };

  $scope.triggerCall = function() {
    $scope.processing = true;
    $scope.show('Triggering a call...');
    API.triggerCall($scope.callTo).then(function(data) {

      if (data.data.status == 'success') {
        $scope.callTo = '';
        $scope.showAlert({
          title: "Success",
          message: "Call trigerred successfully"
        });
      } else {
        $scope.showAlert({
          title: "Oops!!",
          message: "Oops something went wrong! Please try again later."
        });
      }
      $scope.hide();
      $scope.processing = false;

    });

  };

});
