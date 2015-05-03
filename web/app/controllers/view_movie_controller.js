MovieApp.controller('ViewMovieController', function ($scope, FirebaseService, $routeParams, currentAuth, $location) {
    
    if (!currentAuth) {
        $location.path('/login');
    }

    FirebaseService.getMovie($routeParams.id, function(movie) {
        $scope.movie = movie;
    });
});

