export function salvarDados(dados, estadoFormulario){
    dados.preventDefault();

    if(estadoFormulario.paginaAtual === 1){
        estadoFormulario.dados = {
            "nome": dados.target.elements["nome"].value,
            "user": dados.target.elements["user"].value,
            "senha": dados.target.elements["senha"].value,
            "data": dados.target.elements["data"].value,
            "lang": dados.target.elements["lang"].value,
            "email": dados.target.elements["email"].value
        };

        localStorage.setItem("Informações pessoais", JSON.stringify(estadoFormulario.dados));

    }
    else if(estadoFormulario.paginaAtual === 2)
    {
        estadoFormulario.dados = {
            "regiao":dados.target.elements["regiao"].value,
            "cidade":dados.target.elements["cidade"].value,
            "tipo":dados.target.elements["tipo"].value
        };
        
        localStorage.setItem("Registro de cidadania", JSON.stringify(estadoFormulario.dados));
    };
}