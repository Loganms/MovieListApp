<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'Database/db_connection.php';
require 'api_errors.php';

$MOVIELIST_MAX = 40;
$USERNAME_MAX = 20;
$MOVIE_MAX = 100;

$config['displayErrorDetails'] = true;
$config['db']['host']   = $db_connection->host;
$config['db']['user']   = $db_connection->user;
$config['db']['pass']   = $db_connection->password;
$config['db']['dbname'] = $db_connection->database;

$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

// Begin Lazy CORS
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Location')
            ->withHeader('Access-Control-Expose-Headers', 'Location')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
// END Lazy CORS


/* Fake login route. Covers GET and POST functionality for testing */
$app->put('/User', function (Request $request, Response $response) {
   global $USERNAME_MAX, $API_ERROR;
   $body = $request->getParsedBody();
   
   /* Needs proper error message */
   if (!isset($body["username"])) {
      return $response->withStatus(400)->withJson($API_ERROR["fieldMissing"]);
   }
   if ((strlen($body["username"]) === 0) ||
      (strlen($body["username"]) > $USERNAME_MAX)) {
      return $response->withStatus(400)->withJson($API_ERROR["stringLength"]);
   }
   
   $sql = "SELECT * FROM `User` WHERE username = ?";
   $stmt = $this->db->prepare($sql);
   $stmt->execute([$body["username"]]);

   if ($stmt->rowCount() > 0) {
      $user = $stmt->fetch(PDO::FETCH_OBJ);
      return $response->withJson($user);
   } else {
      $sql = "INSERT IGNORE INTO `User` (username) VALUES (?)";
      $stmt = $this->db->prepare($sql);
      $stmt->execute([$body["username"]]);
      $insId = $this->db->lastInsertId();
      $user = array(
         "id" => $insId,
         "username" => $body["username"]
      );
      return $response
           ->withStatus(201)
           ->withHeader('Access-Control-Allow-Headers', 'Location')
           ->withHeader('Location', '/User/' . $insId)
           ->withJson($user)
           ;
   }
});

/* Returns possibly empty array of all MovieList objects */
$app->get('/MovieList', function (Request $request, Response $response) {
   $sql = 'SELECT M.id, userID, listName, username'
         .' FROM MovieList M JOIN `User` U ON M.userID = U.id'
         .' ORDER BY M.id DESC';
   $stmt = $this->db->query($sql);
   $stmt->execute();
   $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
   
   return $response->withJson($results);
});

/* Returns one MovieList object */
$app->get('/MovieList/{id}', function (Request $request, Response $response) {
   global $API_ERROR;
   $id = $request->getAttribute('route')->getArgument('id');
   
   $sql = 'SELECT * FROM MovieList WHERE id = ?';
   $stmt = $this->db->prepare($sql);
   $stmt->execute([$id]);
   $movieList = $stmt->fetch(PDO::FETCH_OBJ);
   
   if ($movieList) {
      return $response->withJson($movieList);
   } else {
      return $response
              ->withStatus(404)
              ->withJson($API_ERROR["resourceNotFound"]("movieList"))
              ;
   }
});

/* AU creates a new MovieList resource, URI returned in location header */
$app->post('/MovieList', function (Request $request, Response $response) {
   global $MOVIELIST_MAX, $API_ERROR;
   $body = $request->getParsedBody();
   
   if (!isset($body["id"]) ||
      !isset($body["listName"])) {
      return $response->withStatus(400)->withJson($API_ERROR["fieldMissing"]);
   }
   if ((strlen($body["listName"] === 0)) ||
      (strlen($body["listName"]) > $MOVIELIST_MAX)) {
      return $response->withStatus(400)->withJson($API_ERROR["stringLength"]);
   }
   
   /* CHECK USER */
   $sql = "SELECT * FROM `User` WHERE id = ?";
   $stmt = $this->db->prepare($sql);
   $stmt->execute([$body["id"]]);
   $userExists = $stmt->fetch();
   
   if (!$userExists) {
      return $response->withStatus(404)
      ->withJson($API_ERROR["resourceNotFound"]("user"))
      ;
   }
   
   /* CHECK MOVIELIST IS UNIQUE */
   $sql = "SELECT userID, listName FROM MovieList WHERE userId=? and listName =?";
   $stmt = $this->db->prepare($sql);
   $stmt->execute([$body["id"], $body["listName"]]);
   $movieListExists = $stmt->fetch();
   
   if ($movieListExists) {
      return $response->withStatus(400)
      ->withJson($API_ERROR["dupResource"]("movieList"));
   }
   
   /* CREATE RESOURCE */
   $sql = "INSERT INTO MovieList (userID, listName) VALUES (?, ?)";
   $stmt = $this->db->prepare($sql);
   $stmt->execute([$body["id"], $body["listName"]]);
   $insId = $this->db->lastInsertId();
   
   return $response
           ->withStatus(201)
           ->withHeader('Access-Control-Allow-Headers', 'Location')
           ->withHeader('Location', '/MovieList/' . $insId)
           ;
});


$app->run();