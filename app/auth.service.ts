import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MovieList } from './classes/movie-list';
import { User } from './classes/user';


@Injectable()
export class AuthService {
   private headers = new Headers({'Content-Type': 'application/json'});
   private authUrl = 'User';// http://localhost/User';
   
   constructor(private http: Http) { }
   
   
   /* Fake sign in using only username.
      Will create a new user if username does not exist.
      Returns the found or newly created user object.
      For Testing purposes only.
   */
   signIn(username: string): Promise<User> {
      return this.http
                 .put(this.authUrl,
                     JSON.stringify({username: username}),
                     {headers: this.headers})
                 .toPromise()
                 .then(response => response.json() as User)
                 .catch(this.handleError);
   }
   
   signOut(id: number): Promise<boolean> {
      return new Promise((resolve, reject) => {
         resolve(true);
      });
   }
   
   private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
   }
}