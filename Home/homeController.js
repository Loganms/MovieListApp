app.controller('homeController',
['$scope', '$state', 'movieLists',
function(scope, $state, movieLists) {
   
   console.log(JSON.stringify(movieLists))
   
   scope.movieLists = movieLists;
}])
