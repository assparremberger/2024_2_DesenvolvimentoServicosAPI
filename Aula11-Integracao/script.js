function add(){
    nome = document.getElementById("txtNome").value;
    preco = document.getElementById("txtPreco").value;

    if( nome.length == 0 ){
        alert("O campo nome deve ser preenchido!");
    }else{
        if( preco.length == 0)
            preco = "0.00";
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200){
                alert("Produto " + nome + " cadastrado!");
                buscarProdutos();
            }else if( this.readyState == 4 ){
                alert( this.status + "\n" + this.responseText);
            }
        }
        ajax.open("POST" , "http://localhost:8001/produto" );
        ajax.setRequestHeader( "Content-type" , 
                    "application/x-www-form-urlencoded" );
        ajax.send( "nome=" + nome + "&preco=" + preco );
    }
}

function buscarProdutos(){
    tabela = document.getElementById("tblProdutos");
    ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
            if( this.readyState == 4 && this.status == 200){
               obj = JSON.parse( this.responseText );
               obj.forEach( prod => {
                    if( document.getElementById("p"+prod.id) == null){
                        linha = tabela.insertRow( -1 );
                        linha.id = "p"+prod.id;
                        cellId = linha.insertCell( 0 );
                        cellNome = linha.insertCell( 1 );
                        cellPreco = linha.insertCell( 2 );
                        cellExcluir = linha.insertCell( 3 );

                        cellId.innerHTML = prod.id;
                        cellNome.innerHTML = prod.nome;
                        cellPreco.innerHTML = prod.preco;
                        cellExcluir.innerHTML = '<button onclick="excluir('+prod.id+')">' +
                                    'Excluir</button>';
                    }
               });
            }else if( this.readyState == 4 ){
                alert( this.status + "\n" + this.responseText);
            }
        }
        ajax.open("GET" , "http://localhost:8001/produto" );
        ajax.send(); 
}

function excluir( idProduto ){
    ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            location.reload();   
        }
    };
    ajax.open( "DELETE" ,  "http://localhost:8001/produto/"+idProduto);
    ajax.send();
}