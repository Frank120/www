angular.module('starter.services', [])
  .factory('loginService', loginService);

function loginService($http, restUrl) {
  return {
    login: function (user) {
      return $http({
        method: 'POST',
        url: restUrl + "common/login",
        params: {
          "username": user.username,
          "password": user.password
        },
        headers: {'X-Ajax-Mode': true, 'Content-Type': 'application/x-www-form-urlencoded'}
      });
    }
  };
}
