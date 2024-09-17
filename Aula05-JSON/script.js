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
            conteudo = "";
            objJSON = JSON.parse( this.responseText);
            if( objJSON.resposta ){
                alert( objJSON.resposta );
            }else{
                objJSON.produtos.forEach( prod =>{
                    conteudo += "<tr>";
                    conteudo += "   <td>" + prod.id + "</td>";
                    conteudo += "   <td>" + prod.nome + "</td>";
                    conteudo += "   <td>" + prod.preco + "</td>";
                    conteudo += "</tr>";
                });
                document.getElementById("tblProdutos").innerHTML += conteudo;
            }
        }
    };

    req.open("GET", "servidor.php", true);
    req.send();
}