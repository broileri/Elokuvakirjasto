describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        module('MovieApp');

        FirebaseServiceMock = (function () {

            var movie = {
                name: "Above the Law",
                year: 1988,
                director: "Andrew Davis",
                description: "Steven Seagal kicks ass."
            };

            return {
                getMovie: function (id, done) {
                    if (id === 'qwerty99') {
                        done(movie);
                    }
                    else {
                        done(null);
                    }
                },
                editMovie: function (editedMovie) {
                    console.log("asd");
                    movie = editedMovie;
                }
            };
        })();

        RouteParamsMock = (function () {
            return {
                id: 'qwerty99'
            };
        })();

        // Spies
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injecting the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });



    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.movie.name).toEqual('Above the Law');
        expect(scope.movie.year).toEqual(1988);
        expect(scope.movie.director).toEqual('Andrew Davis');
        expect(scope.movie.description).toEqual('Steven Seagal kicks ass.');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });


    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.movie.name = 'Nico - Above the Law';
        scope.movie.director = 'Sama kuin ennen, lol';
        scope.movie.year = 1999;
        scope.movie.description = 'Asdf, joo, lol, emt.';
        scope.editMovie(scope.movie);
        expect(scope.movie.name).toEqual('Nico - Above the Law');
        expect(scope.movie.director).toEqual('Sama kuin ennen, lol');
        expect(scope.movie.year).toEqual(1999);
        expect(scope.movie.description).toEqual('Asdf, joo, lol, emt.');
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
    });

    
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.movie.name = '';
        scope.editMovie(scope.movie);
        
        scope.movie.name = 'Above the Law';
        scope.movie.year = '';
        scope.editMovie(scope.movie);
        
        scope.movie.year = 1988;
        scope.movie.director = '';
        scope.editMovie(scope.movie);
        
        scope.movie.director = 'Andrew Davis';
        scope.movie.description = '';
        scope.editMovie(scope.movie);
        
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});