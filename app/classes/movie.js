"use strict";
var Movie = (function () {
    function Movie(id, listID, movieTitle, rating) {
        if (id === void 0) { id = 0; }
        if (movieTitle === void 0) { movieTitle = ''; }
        if (rating === void 0) { rating = 0; }
        this.id = id;
        this.listID = listID;
        this.movieTitle = movieTitle;
        this.rating = rating;
    }
    Movie.prototype.validTitle = function () {
        return this.movieTitle && (this.movieTitle.length >= Movie.MIN_TITLE) &&
            (this.movieTitle.length <= Movie.MAX_TITLE);
    };
    Movie.prototype.validRating = function () {
        //unsure right now what makes for a valid rating
        return typeof (this.rating) === typeof (1);
    };
    Movie.prototype.reset = function () {
        this.id = 0;
        this.movieTitle = '';
        this.rating = 0;
    };
    Movie.MAX_TITLE = 100;
    Movie.MIN_TITLE = 1;
    return Movie;
}());
exports.Movie = Movie;
//# sourceMappingURL=movie.js.map