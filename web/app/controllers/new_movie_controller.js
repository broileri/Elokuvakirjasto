MovieApp.controller('NewMovieController', function ($scope, FirebaseService, currentAuth, $location) {
    
    if (!currentAuth) {
        $location.path('/login');
    }
    
    $scope.movies = FirebaseService.getMovies();

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
    };
});

