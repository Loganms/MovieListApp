app.config(['$stateProvider', '$urlRouterProvider',
   function($stateProvider, $router) {
      
      //redirect to home if path is not matched
      $router.otherwise("/");

      $stateProvider
      .state('home',  {
         url: '/',
         templateUrl: 'Home/home.template.html',
         controller: 'homeController',
         access: {restricted: false},
         resolve: {
            movieList: ['$q', '$http', function($q, http) {
               return []/*(http.get('/MovieList')
               .then(function(response) {
                  return $q.resolve(response.data)
               });*/
            }]
         }
      }); 
   }
]);
