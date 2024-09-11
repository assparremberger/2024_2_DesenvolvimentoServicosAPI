function ler(){
    divInfo = document.getElementById("divInformacoes");
    divInfo.innerHTML = "Carregando...";

    requisicao = new XMLHttpRequest();

    requisicao.onreadystatechange = function(){
        if( this.readyState == 4 && this.status == 200){
            divInfo.innerHTML = this.responseText;
        }
        if( this.readyState == 4 && this.status == 404){
            divInfo.innerHTML = "Resposta: " + this.responseText;
        }
    };

    requisicao.open("GET" , "dados.txt", true);
    requisicao.send();
}

function numeros(){
    req = new XMLHttpRequest();
    divNumeros = document.getElementById("divNumeros");
    divNumeros.innerHTML = "Carregando...";
    req.onreadystatechange = function(){
        if( this.readyState == 0 ) 
            divNumeros.innerHTML += "<BR>Req não inicializada";
        if( this.readyState == 1 ) 
            divNumeros.innerHTML += "<BR>Conexão estabelecida";
        if( this.readyState == 2 ) 
            divNumeros.innerHTML += "<BR>Req recebida no servidor";
        if( this.readyState == 3 ) 
            divNumeros.innerHTML += "<BR>Servidor processando";
        if( this.readyState == 4  && this.status == 200 ) 
            divNumeros.innerHTML += "<HR>" + this.responseText;
    };

    valor = document.getElementById("txtValor").value;
    req.open("GET", "servidor.php?valor="+valor , true);
    req.send();
}