<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
//header('Content-type: json/application');

require 'connect.php';
require 'functions.php';                

$method = $_SERVER['REQUEST_METHOD'];

$q = $_GET['q'];
$params = explode('/', $q);

$type = $params[0];
$id = $params[1];

// GET 
if($method === 'GET') {
    if($type === 'posts' ) {
        if(isset($id)) {
            getPost($connect, $id);
        } else {
            getPosts($connect);
        } 
    }
    
    // CREATE
} else if($method === 'POST') {
    if($type === 'posts') {
        addPost($connect, $_POST);   
    }
    // DELETE
}  else if($method === 'DELETE') {
    if($type === 'posts') {
        if(isset($id)) {
            deletePost($connect, $id);
        }
    }
}