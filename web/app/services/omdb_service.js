MovieApp.service('OMDbService', function ($http) {
    this.findMovie = function (name, year) {
        if (!year) {
            year = '';
        }
        var req = {
            method: 'GET',
            url: 'https://www.omdbapi.com/?s=' +name+ '&y=' + year
        };
        
        return $http(req);
        //return $http.get('//www.omdbapi.com', {params: {s: name, y: year}});
    };
});


