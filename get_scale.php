<?php

if(filter_has_var(INPUT_GET, 'key')) {// && isset($_SERVER['HTTP_X_REQUESTED_WITH'])) {
  require "chromePhP.php";
  $mode = filter_input(INPUT_GET, 'mode', FILTER_SANITIZE_STRING);
  $url = 'js/'.$mode.'_Scales.json';
  $data = file_get_contents($url);
  $scale = json_decode($data);
  $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  $scale2 = $key.$mode;
  // ChromePhp::log(json_encode($scale[0]->$scale2));
  echo json_encode($scale[0]->$scale2);
}
else {
  echo "No!";
  header("Location: ./");
}

?>