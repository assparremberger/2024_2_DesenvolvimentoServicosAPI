const restify = require("restify")
const errors = require("restify-errors")

const server = restify.createServer({
    name : "lojinha" ,
    version : "1.0.0"
})

server.use( restify.plugins.acceptParser( server.acceptable ) )
server.use( restify.plugins.queryParser() )
server.use( restify.plugins.bodyParser() )

server.listen( 8001 ,  function(){
    console.log( "%s executando em: %s" , server.name, server.url )
})

var knex = require("knex")({
    client : "mysql" ,
    connection : {
        host : "localhost" ,
        user : "root" ,
        password : "" ,
        database : "loja"
    }
})

server.get( "/" , (req, res, next)=>{
    res.send("Seja bem-vindo(a) à nossa loja")
})

server.get("/produto" , (req, res, next)=>{
    knex("produto")
        .then( (dados)=>{
            res.send( dados )
        } , next)
})

server.get("/produto/:idProd" , (req, res, next)=>{
    id = req.params.idProd
    knex("produto")
        .where("id" , id )
        .first()
        .then( (dados)=>{
            if( !dados ){
                return res.send( 
                    new errors.BadRequestError("Nenhum produto encontrado") 
                    )
            }
            res.send( dados )
        } , next)
})

server.post("/produto" , (req, res, next)=>{
    knex("produto")
        .insert( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( 
                    new errors.BadRequestError("Não foi possível inserir") 
                    )
            }
            res.send( dados )
        } , next)
})

server.put("/produto/:idProd" , (req, res, next)=>{
    id = req.params.idProd
    knex("produto")
        .where( "id" , id )
        .update( req.body )
        .then( (dados)=>{
            if( !dados ){
                return res.send( 
                    new errors.BadRequestError("Não foi possível editar") 
                    )
            }
            res.send( "Produto editado com sucesso" )
        } , next)
})

server.del("/produto/:idProd" , (req, res, next)=>{
    id = req.params.idProd
    knex("produto")
        .where( "id" , id )
        .delete( )
        .then( (dados)=>{
            if( !dados ){
                return res.send( 
                    new errors.BadRequestError("Não foi possível excluir") 
                    )
            }
            res.send( "Produto excluído com sucesso" )
        } , next)
})
