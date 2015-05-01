MovieApp.controller('EditMovieController', function ($scope, $location, FirebaseService, $routeParams) {

    FirebaseService.getMovie($routeParams.id, function (movie) {
        $scope.movie = movie;
    });

    $scope.editMovie = function () {
        if ($scope.movie.name !== '' && $scope.movie.year !== '' && $scope.movie.director !== '' && $scope.movie.description !== '') {            
            FirebaseService.editMovie($scope.movie);
            $location.path('/');
        }
    };
});