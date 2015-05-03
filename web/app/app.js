var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(function ($routeProvider, $httpProvider) {
    $routeProvider
            .when('/movies', {
                controller: 'MovieListController',
                templateUrl: 'app/views/list.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/register', {
                controller: 'UserController',
                templateUrl: 'app/views/register.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/new', {
                controller: 'NewMovieController',
                templateUrl: 'app/views/new_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/search', {
                controller: 'MovieSearchController',
                templateUrl: 'app/views/search_movie.html'
            })
            .when('/movies/:id', {
                controller: 'ViewMovieController',
                templateUrl: 'app/views/view_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit_movie.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .otherwise({
                redirectTo: '/movies'
            });

    delete $httpProvider.defaults.headers.common["X-Requested-With"];

});

MovieApp.run(function (AuthenticationService, $rootScope, $location) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/login');
    };
    
    $rootScope.userLoggedIn = function () {
        $rootScope.user = AuthenticationService.getUserLoggedIn();
        return $rootScope.user;
    };
    
});