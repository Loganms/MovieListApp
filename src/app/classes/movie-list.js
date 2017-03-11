"use strict";
var MovieList = (function () {
    function MovieList() {
    }
    MovieList.validListName = function (listName) {
        return listName && (listName.length >= MovieList.MIN_NAME) &&
            (listName.length <= MovieList.MAX_NAME);
    };
    MovieList.MAX_NAME = 40;
    MovieList.MIN_NAME = 1;
    return MovieList;
}());
exports.MovieList = MovieList;
//# sourceMappingURL=movie-list.js.map