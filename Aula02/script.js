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




// 03/09/2023

//rgb(255, 0, 0)
//#f00
//#ff0000


$("#minhaDiv").css("width" , "300px");
$("#minhaDiv").css("height" , "200px");
$("#minhaDiv").css("background-color" , "#f0f");
$("#minhaDiv").css("color" , "#fff");
$("#minhaDiv").css("padding" , "10px");
//$("#minhaDiv").html("<u> Olá </u>");
$("#minhaDiv").text("<u> Olá </u>");
//$("#minhaDiv").hide(3000);
$("#minhaDiv").fadeOut(3000);

$("#btnAlterar").click( function(){
    //$("#minhaDiv").show();
    //$("#minhaDiv").toggle(1000);
    //$("#minhaDiv").fadeIn(1000);
    $("#minhaDiv").fadeToggle(5000 , function(){
        alert("Execução concluída!");
    } );
});





