describe('Movie list', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {

        module('MovieApp');

        FirebaseServiceMock = (function () {

            var movies = [
                {
                    name: "Above the Law",
                    year: 1988,
                    director: "Andrew Davis",
                    description: "Steven Seagal kicks ass."
                },
                {
                    name: "Total Recall",
                    year: 1990,
                    director: "Paul Verhoeven",
                    description: "Arnold Schwarzenegger negs schwarz, lol."
                },
                {
                    name: "Universal Soldier",
                    year: 1992,
                    director: "Roland Emmerich",
                    description: "JCVD kicks kicks kicks!"
                }
            ];

            return {
                getMovies: function () {
                    return movies;
                },
                removeMovie: function (movie) {
                    var filteredMovies = [];
                    for (var i = 0; i < movies.length; i++) {
                        if (movies[i].name !== movie.name) {
                            filteredMovies.push(movies[i]);
                        }
                    }
                    movies = filteredMovies;  
                }
            };

        })();

        // Spies!
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

        // Injecting the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('MovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });


    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(scope.movies.length).toBe(3);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        var movie = {
            name: "Total Recall",
            year: 1990,
            director: "Paul Verhoeven",
            description: "Arnold Schwarzenegger negs schwarz, lol."
        };
        scope.removeMovie(movie);
        expect(scope.movies.length).toBe(2);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
    });
});