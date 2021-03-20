<?php

if (filter_has_var(INPUT_GET, 'key')) {

  $key = filter_input(INPUT_GET, 'key', FILTER_SANITIZE_STRING);
  if(filter_has_var(INPUT_GET, 'mode')) :
    $mode = filter_input(INPUT_GET, 'mode', FILTER_SANITIZE_STRING);
    $folderPath = getcwd()."/images/Chords/$key/$mode/";

  else :
    $folderPath = getcwd()."/images/Chords/$key/";
  endif;

  $numImages = 0;

  $files = glob($folderPath . "*.png");

  if($files) {
    echo count($files);
  }
  else {
    echo 0;
  }
  
}
else {
  header("Location: ./");
}
