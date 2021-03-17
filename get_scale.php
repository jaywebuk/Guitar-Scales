<?php

include "ChromePhp.php";

if(filter_has_var(INPUT_GET, 'key')) {
  $url = 'js/scales.json';
  $data = file_get_contents($url);
  $scale = json_decode($data);
  $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  echo json_encode($scale->$key);
}
else {
  header("Location: ./");
}
