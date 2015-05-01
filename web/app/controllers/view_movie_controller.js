MovieApp.controller('ViewMovieController', function ($scope, $location, FirebaseService, $routeParams) {


    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
});

