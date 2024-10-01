editando = false;
codProduto = 0;

function lerJSON(){
    requisicao = new XMLHttpRequest();
    requisicao.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            divJson = document.getElementById("divJson");
            objJSON = JSON.parse( this.responseText ); 
            txt = "Nome: " + objJSON.nome + "<br>";
            txt += "Idade: " + objJSON.idade + "<br>";

            txt += "Formações: ";
            objJSON.formacoes.forEach( valor => {
                txt += "<br><i>"+valor+"</i>";
            });
            txt += "<br>Ano de Formação: " + objJSON.anoDeFormacao;
            txt += "<br>Cônjuge: " + objJSON.conjuge.nome +
                    " - Idade: " + objJSON.conjuge.idade;
            if( objJSON.temFilhos ){
                txt += "<br>Filhos: ";
                objJSON.filhos.forEach( filho => {
                    txt += "<br><i>"+filho.nome + " - Idade: " +
                            filho.idade;
                });
            }

            divJson.innerHTML = txt;
        }
    };
    requisicao.open("GET", "meuJSON.json", true);
    requisicao.send();
}


function buscarProdutos(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            conteudo = " <tr> " +
                       "     <th>ID</th> " +
                       "     <th>Nome</th> " +
                       "     <th>Preço</th> " +
                       "     <th>Excluir</th> " +
                       "     <th>Editar</th> " +
                       " </tr> ";
            objJSON = JSON.parse( this.responseText);
            if( objJSON.resposta ){
                alert( objJSON.resposta );
            }else{
                objJSON.produtos.forEach( prod =>{
                    conteudo += "<tr>";
                    conteudo += "   <td>" + prod.id + "</td>";
                    conteudo += "   <td>" + prod.nome + "</td>";
                    conteudo += "   <td>" + prod.preco + "</td>";
                    conteudo += "   <td><button onclick='excluir("+ prod.id +")' > X </button></td>";
                    conteudo += "   <td><button onclick='carregarForm("+ prod.id ;
                    conteudo +=  ", \""+prod.nome+"\" , " + prod.preco + " )' >" ;
                    conteudo +=  "Editar</button></td>";
                    conteudo += "</tr>";
                });
                document.getElementById("tblProdutos").innerHTML = conteudo;
            }
        }
    };

    req.open("GET", "servidor.php?buscar", true);
    req.send();
}


function carregarForm( id, nome, preco){
    editando = true;
    codProduto = id;
    document.getElementById("txtNome").value = nome;
    document.getElementById("txtPreco").value = preco;
    document.getElementById("btnSalvar").innerHTML = "Editar";
}

function cadastrar(){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            objJSON = JSON.parse( this.responseText);
            alert( objJSON.resposta );
            buscarProdutos();
        }
    };
    nome = document.getElementById("txtNome").value;
    preco = document.getElementById("txtPreco").value;
    preco = preco.replace("," , ".");

    if( editando ){
        req.open("POST", "servidor.php?editar&id="+codProduto, true);
        document.getElementById("btnSalvar").innerHTML = "Cadastrar";
        editando = false;
        codProduto = 0;
    }else{
        req.open("POST", "servidor.php?inserir", true);
    }
    
    req.setRequestHeader("Content-type" , 
                    "application/x-www-form-urlencoded" );
    req.send( "nome=" + nome +"&preco=" + preco);
    document.getElementById("txtNome").value = "";
    document.getElementById("txtPreco").value = "";
}

function excluir( id ){
    req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            objJSON = JSON.parse( this.responseText);
            alert( objJSON.resposta );
            buscarProdutos();
        }
    };
    req.open("GET", "servidor.php?excluir&id=" + id, true);
    req.send();
}