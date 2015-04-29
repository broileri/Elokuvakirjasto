MovieApp.service('FirebaseService', function ($firebase) {

    var firebaseRef = new Firebase('https://weso.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();


    this.getMovies = function () {
        return movies;
    }

    this.addMovie = function (movie) {
        movies.$add(movie);
    } 
    
    this.removeMovie = function (movie) {
        movies.$remove(movie);
    }

});