<?php

include "ChromePhp.php";

// if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
  // ChromePhp::log("bolg");
  $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  if(filter_has_var(INPUT_GET, 'mode')) :
    $mode = filter_input(INPUT_GET, 'mode', FILTER_SANITIZE_STRING);
    $folderPath = getcwd()."/images/Chords/$key/$mode/";

  else :
    $folderPath = getcwd()."/images/Chords/$key/";
  endif;

  $numImages = 0;



  $files = glob($folderPath . "*.png");
  // ChromePhp::log($files);
  if($files) {
    // ChromePhp::log($files);
    echo count($files);
  }
  else {
    echo 0;
  }
  
// }
/* else {
  header("Location: ./");
} */

?>