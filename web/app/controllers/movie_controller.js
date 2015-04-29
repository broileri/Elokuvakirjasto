MovieApp.controller('MovieController', function ($scope, FirebaseService) {

    $scope.movies = FirebaseService.getMovies();

    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie); 
        $scope.movies = FirebaseService.getMovies();
    };

});

MovieApp.controller('AddMovieController', function ($scope, FirebaseService, $location) {

    $scope.addMovie = function () {

        if ($scope.movieName !== '' && $scope.movieYear !== '' && $scope.movieDirector !== '' && $scope.movieDescription !== '') {
            FirebaseService.addMovie({
                name: $scope.movieName,
                year: $scope.movieYear,
                director: $scope.movieDirector,
                description: $scope.movieDescription
            });
            $scope.movieName = '';
            $scope.movieYear = '';
            $scope.movieDirector = '';
            $scope.movieDescription = '';
            $location.path('/');
        }
    }
});