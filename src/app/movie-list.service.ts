import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MovieList } from './classes/movie-list';
import { Movie } from './classes/movie';
import { User } from './classes/user';

@Injectable()
export class MovieListService {
   private headers = new Headers({'Content-Type': 'application/json'});
   private host = 'http://localhost';
   private movieListsUrl = 'http://localhost/MovieList';
   
   constructor(private http: Http) { }

   // GET /MovieList
   getMovieLists(): Promise<MovieList[]> {
      return this.http.get(this.movieListsUrl)
                 .toPromise()
                 .then(response => {
                     let list = response.json() as MovieList[];
                     for (let elem of list)
                        elem.newMovieEntry = new Movie(0, elem.id, '', 0);
                     return list;
                 })
                 .catch(this.handleError);
   }
   
   // GET /MovieList/{id}
   getMovieList(id: number): Promise<MovieList> {
      return this.http.get(this.movieListsUrl)
                 .toPromise()
                 .then(response => response.json() as MovieList)
                 .catch(this.handleError);
   }

   
   // POST /MovieList
   createMovieList(user: User, listName: string): Promise<string> {
      return this.http
                 .post(this.movieListsUrl,
                     JSON.stringify({id: user.id, listName: listName}),
                     {headers: this.headers})
                 .toPromise()
                 .then(response => response.headers.get('location'))
                 .catch(this.handleError);
   }
   
   // GET /MovieList/{id}/Movie
   getMovies(id: number): Promise<Movie[]> {
      return this.http.get(this.movieListsUrl + '/' + id + '/Movie')
                 .toPromise()
                 .then(response => response.json() as Movie[])
                 .catch(this.handleError);
   }
   
   // POST /MovieList/{id}/Movie
   createMovie(user: User, mlist: MovieList): Promise<string> {
      var movie = mlist.newMovieEntry;
      console.log(movie.rating);
      console.log(typeof movie.rating);
      return this.http
                 .post(this.movieListsUrl + '/' + mlist.id + '/Movie',
                     JSON.stringify({id: user.id,
                        movieTitle: movie.movieTitle,
                        rating: movie.rating}),
                     {headers: this.headers})
                 .toPromise()
                 .then(response => {
                     return this.getMovie(this.host + 
                        response.headers.get('location'));
                 })
                 .then(movie => {
                     mlist.newMovieEntry.reset();
                     return mlist.movies.push(movie);
                 })
                 .catch(this.handleError);
   }
   
   // GET /MovieList/{listID}/Movie/{movieID}
   private getMovie(loc: string): Promise<Movie> {
      return this.http.get(loc)
                 .toPromise()
                 .then(response => response.json() as Movie)
                 .catch(this.handleError);
   }
   
   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}