<?php

if (filter_has_var(INPUT_GET, 'key')) {

  $key = htmlspecialchars($_GET['key']);
  
  if(filter_has_var(INPUT_GET, 'mode')) :
    $mode = htmlspecialchars($_GET['mode']);
    $folderPath = "../images/Chords/$key/$mode/";

  else :
    $folderPath = "../images/Chords/$key/";
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
