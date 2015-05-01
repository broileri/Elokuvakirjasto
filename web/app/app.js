var MovieApp = angular.module('MovieApp', ['ngRoute', 'firebase']);

MovieApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'MovieListController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies', {
                controller: 'MovieListController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies/new', {
                controller: 'NewMovieController',
                templateUrl: 'app/views/new_movie.html'
            })
            .when('/movies/:id', {
                controller: 'ViewMovieController',
                templateUrl: 'app/views/view_movie.html'
            })
            .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/edit_movie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});