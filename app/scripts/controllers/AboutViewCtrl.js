define(['app'], function(app) {
    app.controller('AboutViewCtrl', ['$scope', function($scope) {
        $scope.page = {
            heading: 'About Us'
        };
    }]);
});