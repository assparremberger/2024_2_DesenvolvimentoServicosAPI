<?php

    header("Content-type: application/json");

    if( isset( $_REQUEST["buscar"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
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
    }


    if( isset( $_REQUEST["inserir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
            if( $conn ){
                $nome = $_POST["nome"];
                $preco = $_POST["preco"];

                $consulta = "INSERT INTO produto (nome, preco) VALUES
                                ( '$nome' , $preco ) ";
                mysqli_query( $conn , $consulta );
                $id = mysqli_insert_id($conn);
                mysqli_close($conn);
                if( $id && $id > 0 ){
                    echo '{ "resposta" : "Produto cadastrado com sucesso!"}';
                }else{
                    echo '{ "resposta" : "Erro ao tentar cadastrar o produto!"}';
                }
            }else{
                echo '{ "resposta" : "Erro ao conectar com o banco de dados"}';
            }
        }catch( \Throwable $th  ){
            echo '{ "resposta" : "Erro no servidor"}';
        }
    }

    if( isset( $_REQUEST["excluir"]) ){
        try{
            $conn = mysqli_connect("localhost", "root", "", "loja");
            if( $conn ){
                $id = $_GET["id"];
                $consulta = "DELETE FROM produto WHERE id =  $id";
                mysqli_query( $conn , $consulta );
                mysqli_close($conn);
                echo '{ "resposta" : "Produto Excluído"}';
            }else{
                echo '{ "resposta" : "Erro ao conectar com o banco de dados"}';
            }
        }catch( \Throwable $th  ){
            echo '{ "resposta" : "Erro no servidor"}';
        }
    }