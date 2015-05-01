MovieApp.controller('MovieListController', function ($scope, FirebaseService) {

    $scope.movies = FirebaseService.getMovies();

    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie); 
        $scope.movies = FirebaseService.getMovies();
    };

});