MovieApp.controller('MovieSearchController', function ($scope, OMDbService) {

    $scope.searched = false;
    
    $scope.searchMovies = function () {
        OMDbService.findMovie($scope.movie.name, $scope.movie.year).success(function (movies) {
            $scope.movies = movies;
            $scope.searched = true;
        });
    };    
});