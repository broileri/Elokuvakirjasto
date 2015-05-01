describe('Show movie', function () {
    var controller, scope;
    var FirebaseServiceMock, RouteParamsMock;
    beforeEach(function () {
        module('MovieApp');
        FirebaseServiceMock = (function () {

            return {
                getMovie: function (id, done) {                    
                    if (id === 'qwerty99') {
                        done({
                            name: "Above the Law",
                            year: 1988,
                            director: "Andrew Davis",
                            description: "Steven Seagal kicks ass."
                        });
                    }
                    else {
                        done(null);
                    }
                }
            };
        })();
        RouteParamsMock = (function () {
            return {
                id: 'qwerty99'
            };
        })();

        // Spy!
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();

        // Injecting the controller
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('ViewMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    it('should show current movie from Firebase', function () {
        expect(scope.movie.name).toEqual('Above the Law');
        expect(scope.movie.year).toEqual(1988);
        expect(scope.movie.director).toEqual('Andrew Davis');
        expect(scope.movie.description).toEqual('Steven Seagal kicks ass.');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });
});