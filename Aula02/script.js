function validar(){
    nome = document.getElementById("txtNome").value;
    pResult = document.getElementById("pResult");

    if( nome.length == 0 ){
        pResult.innerHTML = "O campo nome é obrigatório!";
        pResult.style.backgroundColor = "#f00";
        return false;
    }else{
        pResult.innerHTML = "Formulário validado";
        pResult.style.backgroundColor = "#0f0";
        return true;
    }
}

soma = 0.0;
txtValor = document.getElementById("txtValor");
lista = document.getElementById("lista");
pSoma = document.getElementById("pSoma");
function somar(){
    valor = txtValor.value;
    if( valor.length == 0 ){
        alert("O campo deve ser preenchido!");
    }else if( isNaN(valor) ){
        alert("O campo deve ser preenchido com números!");
    }else if( parseInt(valor) % 2 != 0 ){
        alert("Somente números pares são aceitos!");
    }else{
        soma += parseInt(valor);
        lista.innerHTML += "<li>" + valor + "</li>";
        pSoma.innerHTML = "Soma: " + soma;
        
    }
    txtValor.value = "";
}