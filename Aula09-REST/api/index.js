const express = require("express")
const http = require("http")
const app = express()

produtos = ["Coca-Cola", "Pepsi", "Fanta"]

app.get("/", (req, res) => {
    res.status(200).send("Bem-vindo(a) à nossa API-REST")
})

app.get("/produto", (req, res) => {
    res.status(200).send( produtos )
})

app.get("/produto/:idProd", (req, res) => {
    index = parseInt( req.params.idProd )
    if( index > produtos.length || index <= 0 ){
        res.status(200).send("Produto não existente")
        console.log("Produto não existente")
    }else{
        res.status(200).send( produtos[ index-1 ] )
    }
})

app.post("/produto", (req, res) => {
    nome = "Prod" + (produtos.length + 1)
    produtos.push( nome )
    res.status(200).send( ""+produtos.length )
})


app.delete("/produto/:idProd", (req, res) => {
    index = parseInt( req.params.idProd )
    if( index > produtos.length || index <= 0 ){
        res.status(200).send("Produto não existente")
    }else{
        index -= 1
        produtos.splice( index , 1 )
        res.status(200).send( "Produto removido" )
    }
})

app.put("/produto/:idProd", (req, res) => {
    index = parseInt( req.params.idProd )
    if( index > produtos.length || index <= 0 ){
        res.status(200).send("Produto não existente")
    }else{
        novoNome = "Novo Prod_" + index
        index -= 1
        produtos[index] = novoNome
        res.status(200).send( "Produto atualizado" )
    }
})

http.createServer(app).listen( 8001 , ()=>{
    console.log( "Servidor rodando em: http://localhost:8001" )
})




