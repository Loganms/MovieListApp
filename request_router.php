<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
require 'Database/db_connection.php';

$mysqli = new mysqli($db_connection->host,
                         $db_connection->user,
                         $db_connection->password,
                         $db_connection->database);

if ($mysqli->connect_errno) {
   echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") "
    . $mysqli->connect_error;
}

$app = new \Slim\App;
$app->get('/MovieList', function (Request $request, Response $response) {
   $res = $mysqli->query($mysqli, "SELECT * FROM MovieList");
   $row = $res->fetch_assoc();
   
   $newResponse = $response->withJson($row, 200);

   return $newResponse;
});
$app->run();