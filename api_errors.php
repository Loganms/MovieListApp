<?php

$API_ERROR = array(
   "resourceNotFound" => function ($resource) {
         return (object)['message' => 'resource not found',
                         'resource' => $resource];
   },
   "dupResource" => function ($resource) {
         return (object)['message' => 'resource already exists',
                         'resource' => $resource];
   },
   "fieldMissing" => (object) ['message' => 'a required field is missing'],
   "stringLength" => (object) ['message' => 'max or min string length not observed']

);