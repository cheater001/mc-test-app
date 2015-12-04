define([
    'services/depsResolver'
], function(depsResolver) {
    var app = angular.module('app', [
        'ngRoute'
    ]);

    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            var config = app.config;

            config.sort(function(a, b) {
                return a.order - b.order;
            });

	        app.controller = $controllerProvider.register;
	        app.directive = $compileProvider.directive;
	        app.filter = $filterProvider.register;
	        app.factory = $provide.factory;
	        app.service = $provide.service;
	        app.value = $provide.value;

            app.value('config', app.config);

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            if (config) {
                angular.forEach(config, function(tab) {
                    $routeProvider.when('/' + tab.id, {
                        templateUrl: tab.templateUrl,
                        resolve: depsResolver(tab.deps)
                    });
                });
            }

            $routeProvider.otherwise({
                redirectTo: '/' + config[0].id
            });
        }
    ]);

    app.run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.isActive = function (location) {
            return location === $location.path();
        };
    }]);

    app.directive('mcTabs', ['config', function(config) {
        return {
            restrict: 'A',
            templateUrl: '/views/tabs.html',
            link: postLink
        };

        function postLink(scope, element, attrs) {
            scope.tabs = config;
        }
    }]);

    return app;
});