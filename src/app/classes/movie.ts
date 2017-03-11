export class Movie {
   public static readonly MAX_TITLE: number = 100;
   public static readonly MIN_TITLE: number = 1;

   id: number;
   listID: number;
   movieTitle: string;
   rating: number;

   constructor(id: number = 0, listID: number, movieTitle: string = '',
    rating: number = 0) {
      this.id = id;
      this.listID = listID;
      this.movieTitle = movieTitle;
      this.rating = rating;
   }

   validTitle() {
      return this.movieTitle && (this.movieTitle.length >= Movie.MIN_TITLE) &&
         (this.movieTitle.length <= Movie.MAX_TITLE);
   }

   validRating() {
      //unsure right now what makes for a valid rating
      return typeof(this.rating) === typeof(1);
   }
   
   reset() {
      this.id = 0;
      this.movieTitle = '';
      this.rating = 0;
   }
}