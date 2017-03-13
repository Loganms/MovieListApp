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
            .catch(error => console.error("DIALOG: bad request acknowledged"));
   }
   
   /* API wrappers */
   getMovieLists(): void {
      this.movieListService.getMovieLists()
         .then(mlists => this.movieLists = mlists);
   } 
   
   createMovieList() {
      if (this.user && MovieList.validListName(this.newMovieListName)) {
         
         this.movieListService.createMovieList(this.user, this.newMovieListName)
            .then(location => {
               console.log("resource created at: " + location);
               this.newMovieListName = '';
               this.getMovieLists();
            })
            .catch(error => console.error("DIALOG: bad request acknowledged"));
      } else {
         console.error("DIALOG: couldn't begin createMovieList call.");
      }
   }
   
   deleteMovieList(mlist: MovieList): void {
      // NEED CONFIRM DIALOG!!!
   
      if (this.user) {
         this.movieListService.deleteMovieList(this.user, mlist)
            .then(status => {
               for(let i = this.movieLists.length - 1; i >= 0; i--) {
                  if (this.movieLists[i].id === mlist.id) {
                     this.movieLists.splice(i, 1);
                     break;
                  }
               }
            })
            .catch(error => console.error("DIALOG: bad request acknowledged"));  
      } else {
         console.error("DIALOG: couldn't begin deleteMovieList call.")
      }
   }
   
   addMovie(mlist: MovieList): void {
      var movie = mlist.newMovieEntry;
      if (movie.validTitle() && movie.validRating()) {
         this.movieListService.createMovie(this.user, mlist)
            .catch(error => console.error("bad request acknowledged"));
         
      } else {
         console.error("DIALOG: couldn't begin addMovie call");
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
}
