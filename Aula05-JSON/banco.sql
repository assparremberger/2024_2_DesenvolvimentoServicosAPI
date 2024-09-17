CREATE DATABASE loja;

USE loja;


CREATE TABLE produto (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT , 
    nome VARCHAR(50) NOT NULL ,
    preco DOUBLE 
);
    
INSERT INTO produto ( nome, preco ) VALUES 
( "Coca-Cola" , 8.99 ) ,
( "Pepsi" , 7.95 ) ,
( "Trakinas" , 3.95 );