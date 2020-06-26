<?php

include "ChromePhp.php";

if(filter_has_var(INPUT_GET, 'key') && (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')) {
  $url = 'js/scales.json';
  $data = file_get_contents($url);
  $scale = json_decode($data);
  $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  echo json_encode($scale->$key);
}
else {
  header("Location: ./");
}
