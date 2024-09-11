<?php
    $valor = $_GET["valor"];
    $text = "";
    for( $i = 1; $i <= $valor; $i++){
        $text .= $i."<br>";
    }
    echo $text;