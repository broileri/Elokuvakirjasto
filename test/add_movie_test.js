describe('Add movie', function () {
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
                addMovie: function (movie) {
                    movies.push(movie);
                }
            };

        })();

        // Spy!
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();

        // Injecting the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('NewMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {

        scope.movieName = "The Mask";
        scope.movieYear = 1994;
        scope.movieDirector = "Chuck Russell";
        scope.movieDescription = "Jim Carrey's face is green.";

        scope.addMovie();
        expect(scope.movies.length).toBe(4);
        expect(scope.movies[3].name).toBe("The Mask");
        expect(scope.movies[3].year).toBe(1994);
        expect(scope.movies[3].director).toBe("Chuck Russell");
        expect(scope.movies[3].description).toBe("Jim Carrey's face is green.");
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        scope.movieName = "";
        scope.movieYear = 1994;
        scope.movieDirector = "Chuck Russell";
        scope.movieDescription = "Jim Carrey's face is green.";
        scope.addMovie();
        
        scope.movieName = "TheMask";
        scope.movieYear = "";
        scope.movieDirector = "Chuck Russell";
        scope.movieDescription = "Jim Carrey's face is green.";
        scope.addMovie();
        
        scope.movieName = "The Mask";
        scope.movieYear = 1994;
        scope.movieDirector = "";
        scope.movieDescription = "Jim Carrey's face is green.";
        scope.addMovie();
        
        scope.movieName = "";
        scope.movieYear = 1994;
        scope.movieDirector = "Chuck Russell";
        scope.movieDescription = "";
        scope.addMovie();        
        
        expect(scope.movies.length).toBe(3);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});