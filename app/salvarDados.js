export function salvarDados(dados, pagina){
    dados.preventDefault();

    if(pagina == 1){
        let listaInformacoesPessoais = {
            "nome": dados.target.elements["nome"].value,
            "user": dados.target.elements["user"].value,
            "senha": dados.target.elements["senha"].value,
            "data": dados.target.elements["data"].value,
            "lang": dados.target.elements["lang"].value,
            "email": dados.target.elements["email"].value
        }
        
        localStorage.setItem("Informações pessoais", JSON.stringify(listaInformacoesPessoais));

    }else if(pagina == 2){
        let listaCidadania = {
            "regiao":dados.target.elements["regiao"].value,
            "cidade":dados.target.elements["cidade"].value,
            "tipo":dados.target.elements["tipo"].value
        }   
        
        localStorage.setItem("Registro de cidadania", JSON.stringify(listaCidadania));
    }else{
        return;
    }
}