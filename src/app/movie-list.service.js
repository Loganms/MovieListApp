"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var movie_1 = require('./classes/movie');
var MovieListService = (function () {
    function MovieListService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.host = 'http://localhost';
        this.movieListsUrl = 'http://localhost/MovieList';
    }
    // GET /MovieList
    MovieListService.prototype.getMovieLists = function () {
        return this.http.get(this.movieListsUrl)
            .toPromise()
            .then(function (response) {
            var list = response.json();
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var elem = list_1[_i];
                elem.newMovieEntry = new movie_1.Movie(0, elem.id, '', 0);
            }
            return list;
        })
            .catch(this.handleError);
    };
    // GET /MovieList/{id}
    MovieListService.prototype.getMovieList = function (id) {
        return this.http.get(this.movieListsUrl)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // POST /MovieList
    MovieListService.prototype.createMovieList = function (user, listName) {
        return this.http
            .post(this.movieListsUrl, JSON.stringify({ id: user.id, listName: listName }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.headers.get('location'); })
            .catch(this.handleError);
    };
    // GET /MovieList/{id}/Movie
    MovieListService.prototype.getMovies = function (id) {
        return this.http.get(this.movieListsUrl + '/' + id + '/Movie')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    // POST /MovieList/{id}/Movie
    MovieListService.prototype.createMovie = function (user, mlist) {
        var _this = this;
        var movie = mlist.newMovieEntry;
        console.log(movie.rating);
        console.log(typeof movie.rating);
        return this.http
            .post(this.movieListsUrl + '/' + mlist.id + '/Movie', JSON.stringify({ id: user.id,
            movieTitle: movie.movieTitle,
            rating: movie.rating }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return _this.getMovie(_this.host +
                response.headers.get('location'));
        })
            .then(function (movie) {
            mlist.newMovieEntry.reset();
            return mlist.movies.push(movie);
        })
            .catch(this.handleError);
    };
    // GET /MovieList/{listID}/Movie/{movieID}
    MovieListService.prototype.getMovie = function (loc) {
        return this.http.get(loc)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    MovieListService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    MovieListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MovieListService);
    return MovieListService;
}());
exports.MovieListService = MovieListService;
//# sourceMappingURL=movie-list.service.js.map