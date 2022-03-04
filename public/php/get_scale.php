<?php

// include "ChromePhp.php";

if(filter_has_var(INPUT_GET, 'key')) {
  
  $scale = json_decode(file_get_contents('../js/scales.json'));
  $key = htmlspecialchars($_GET['key']);
  // $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  if (isset($scale) && isset($key)) {
    echo json_encode($scale->$key);
  }
  else {
    echo json_encode(['error' => 'Error retrieving scale data']);
  }
}
else {
  header("Location: ./");
}
