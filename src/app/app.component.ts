import { Component, OnInit } from '@angular/core';

import { MovieList } from './classes/movie-list';
import { Movie } from './classes/movie';
import { User } from './classes/user';

import { MovieListService } from './movie-list.service';
import { AuthService } from './auth.service';

@Component({
   moduleId: module.id,
   selector: 'mainApp',
   templateUrl: './app.component.html',
   providers: [MovieListService, AuthService]
})


export class AppComponent implements OnInit {
   private title = 'Movie Lists!';
   private movieLists: MovieList[];
   private signedIn = false;
   private user: User = {
      id: null,
      username: ''
   };
   private newMovieListName = '';
      
   constructor(private movieListService: MovieListService,
               private authService: AuthService) {}
   
   ngOnInit(): void {
      this.getMovieLists();
   }
      
   onSelectMovieList(mlist: MovieList): void {
      if (mlist.movies === undefined)
         this.movieListService.getMovies(mlist.id)
            .then(list => mlist.movies = list)
            .catch(error => console.error("bad request acknowledged"));
   }
   
   addMovie(mlist: MovieList): void {
      if (mlist.newMovieEntry &&
         mlist.newMovieEntry.length > 0 &&
         mlist.newMovieEntry.length <= this.movieListService.MOVIE_MAX) {
         
         /* this.movieListService.addMovie(this.user, mlist.id, mlist.newMovieEntry)
            .then(location => {
               console.log("resource created at: " + location);
               //easy way for now
               this.getMovieLists();
            })
            .catch(error => console.error("bad request acknowledged")); */
         
      }
   }
   
   signIn(username: string): void {
      this.authService.signIn(username)
         .then(user => {
            this.user = user;
            this.signedIn = true;
         });
   }
   
   signOut(id: number): void {
      this.authService.signOut(id)
         .then( success => {
            this.user.id = null;
            this.user.username = '';
            this.signedIn = false;
         });
   }
   
   createMovieList() {
      if (this.user && this.newMovieListName &&
         this.newMovieListName.length > 0 
         && this.newMovieListName.length <= this.movieListService.MOVIE_LIST_MAX) {
         
         this.movieListService.createMovieList(this.user, this.newMovieListName)
            .then(location => {
               console.log("resource created at: " + location);
               this.newMovieListName = '';
               this.getMovieLists();
            })
            .catch(error => console.error("bad request acknowledged"));
      } else {
         // Dialog
         console.error("couldn't begin createMovieList call.");
      }
   }
   
   getMovieLists(): void {
      this.movieListService.getMovieLists()
         .then(mlists => this.movieLists = mlists);
   }
}
