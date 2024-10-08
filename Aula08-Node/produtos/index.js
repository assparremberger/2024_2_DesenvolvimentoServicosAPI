const http = require('http')
const mysql = require('mysql')

const hostname = "127.0.0.1"
const port = 3000

const conn = mysql.createConnection({
    host : 'localhost' ,
    user : 'root' ,
    password : '' ,
    database : 'loja'
})


const server = http.createServer( (req, res) =>{
    res.statusCode = 200
    res.setHeader("Content-Type" , "text/plain")
    sql = "SELECT * order FROM produto ORDER BY nome"
    console.log( conn.state  )
    if( conn.state != "authenticated" ){
        try {
            conn.connect( function(erro) {
                if( erro ){
                    res.end( '{ "resposta" : "Erro na Conexão" }' )
                }
            })
        } catch (error) {
            '{ "resposta" : "Erro na Conexão" }'
        }
        
    }
    try {
        conn.query( sql , function(err, result, fields ){
            if( err ){
                res.end('{ "resposta" : "Erro na Consulta" }')
            }else{
                res.end( JSON.stringify(result)  )
            }
        })  
    } catch (error) {
        res.end('{ "resposta" : "'+ error.toString()+'" }')
    }
    
})
server.listen( port , hostname, () => {
    console.log(`Servidor no ar em: http://${hostname}:${port}`)
})