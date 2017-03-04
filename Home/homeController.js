app.controller('homeController',
['$scope', '$state', 'movieList',
function(scope, $state, movieList) {
   
   console.log(JSON.stringify(movieList))
   
   scope.movieList = movieList;
   
   scope.myInterval = 5000;
   scope.active = 0;
   

   
}])
