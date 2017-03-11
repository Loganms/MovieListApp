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
var movie_list_1 = require('./classes/movie-list');
var movie_list_service_1 = require('./movie-list.service');
var auth_service_1 = require('./auth.service');
var AppComponent = (function () {
    function AppComponent(movieListService, authService) {
        this.movieListService = movieListService;
        this.authService = authService;
        this.title = 'Movie Lists!';
        this.signedIn = false;
        this.user = {
            id: null,
            username: ''
        };
        this.newMovieListName = '';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getMovieLists();
    };
    AppComponent.prototype.onSelectMovieList = function (mlist) {
        if (mlist.movies === undefined)
            this.movieListService.getMovies(mlist.id)
                .then(function (list) { return mlist.movies = list; })
                .catch(function (error) { return console.error("bad request acknowledged"); });
    };
    AppComponent.prototype.addMovie = function (mlist) {
        var movie = mlist.newMovieEntry;
        if (movie.validTitle() && movie.validRating()) {
            this.movieListService.createMovie(this.user, mlist)
                .catch(function (error) { return console.error("bad request acknowledged"); });
        }
        else {
            //Dialog
            console.error("couldn't begin addMovie call");
        }
    };
    AppComponent.prototype.signIn = function (username) {
        var _this = this;
        this.authService.signIn(username)
            .then(function (user) {
            _this.user = user;
            _this.signedIn = true;
        });
    };
    AppComponent.prototype.signOut = function (id) {
        var _this = this;
        this.authService.signOut(id)
            .then(function (success) {
            _this.user.id = null;
            _this.user.username = '';
            _this.signedIn = false;
        });
    };
    AppComponent.prototype.createMovieList = function () {
        var _this = this;
        if (this.user && movie_list_1.MovieList.validListName(this.newMovieListName)) {
            this.movieListService.createMovieList(this.user, this.newMovieListName)
                .then(function (location) {
                console.log("resource created at: " + location);
                _this.newMovieListName = '';
                _this.getMovieLists();
            })
                .catch(function (error) { return console.error("bad request acknowledged"); });
        }
        else {
            // Dialog
            console.error("couldn't begin createMovieList call.");
        }
    };
    AppComponent.prototype.getMovieLists = function () {
        var _this = this;
        this.movieListService.getMovieLists()
            .then(function (mlists) { return _this.movieLists = mlists; });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'mainApp',
            templateUrl: './app.component.html',
            providers: [movie_list_service_1.MovieListService, auth_service_1.AuthService]
        }), 
        __metadata('design:paramtypes', [movie_list_service_1.MovieListService, auth_service_1.AuthService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map