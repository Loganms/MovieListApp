import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MovieList } from './classes/movie-list';
import { User } from './classes/user';

@Injectable()
export class MovieListService {
   public MOVIE_LIST_MAX = 40;
   private headers = new Headers({'Content-Type': 'application/json'});
   private movieListsUrl = ' http://localhost/MovieList';
   
   constructor(private http: Http) { }

   getMovieLists(): Promise<MovieList[]> {
      return this.http.get(this.movieListsUrl)
                 .toPromise()
                 .then(response => response.json() as MovieList[])
                 .catch(this.handleError);
   }
   
   createMovieList(user: User, listName: string): Promise<string> {
      return this.http
                 .post(this.movieListsUrl,
                     JSON.stringify({id: user.id, listName: listName}),
                     {headers: this.headers})
                 .toPromise()
                 .then(response => response.headers.get('Location'))
                 .catch(this.handleError);
   }
   
   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}