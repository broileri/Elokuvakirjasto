var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'MovieController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies', {
                controller: 'MovieController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/add_movie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});