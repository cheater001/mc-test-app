define(['app'], function(app) {
    app.controller('HomeViewCtrl', ['$scope', function($scope) {
        $scope.page = {
            heading: 'Welcome'
        };
    }]);
});
