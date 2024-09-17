<?php

    header("Content-type: application/json");

    try{
        $conn = mysqli_connect("localhost", "root", "", "loja", 8081);
        if( $conn ){
            $consulta = "SELECT * FROM produto ORDER BY nome";
            $result = mysqli_query( $conn , $consulta );
            $linhas = array();

            while( $row = mysqli_fetch_assoc($result) ){
                $linhas[] = $row;
            }
            mysqli_close($conn);
            echo '{ "produtos": '.json_encode($linhas).' }';

        }else{
            echo '{ "resposta" : "Erro ao conectar com o banco de dados"}';
        }
    }catch( \Throwable $th  ){
        echo '{ "resposta" : "Erro no servidor"}';
    }