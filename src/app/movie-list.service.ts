import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MovieList } from './classes/movie-list';
import { Movie } from './classes/movie';
import { User } from './classes/user';

@Injectable()
export class MovieListService {
   public MOVIE_LIST_MAX = 40;
   public MOVIE_MAX = 100;
   private headers = new Headers({'Content-Type': 'application/json'});
   private movieListsUrl = ' http://localhost/MovieList';
   
   constructor(private http: Http) { }

   // GET /MovieList
   getMovieLists(): Promise<MovieList[]> {
      return this.http.get(this.movieListsUrl)
                 .toPromise()
                 .then(response => response.json() as MovieList[])
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
   createMovie(user: User, listID: number, movieTitle: string): Promise<any> {
      return this.http
                 .post(this.movieListsUrl + '/' + id + '/Movie',
                     JSON.stringify({id: user.id,
                        listID: listID,
                        movieTitle: movieTitle}),
                     {headers: this.headers})
                 .toPromise()
                 .then(response => response.headers.get('location'))
                 .catch(this.handleError);
   }
   
   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}