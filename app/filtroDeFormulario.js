export function filtrarFormulario(){
    const camposDoFormulario        = document.querySelectorAll("[required]");
    

    camposDoFormulario.forEach((campo) => {
        campo.addEventListener("blur", () => verificaCampo(campo));
        campo.addEventListener("invalid", evento => evento.preventDefault());
    })
    
}

function verificaCampo(campo){
    const mensagens = {
        nome: {
            valueMissing: "O campo de nome não pode estar vazio.",
            patternMismatch: "Por favor, preencha um nome válido.",
            tooShort: "Por favor, preencha um nome válido."
        },
        user: {
            valueMissing: "O campo de usuario deve ser preenchido"
        },
        senha: {
            valueMissing: "O campo de usuario deve ser preenchido"
        },
        data: {
            valueMissing: 'O campo de data de nascimento não pode estar vazio.',
            customError: 'Insira uma idade real acima de 13 anos.'
        },
        email: {
            valueMissing: "O campo de e-mail não pode estar vazio.",
            typeMismatch: "Por favor, preencha um email válido.",
            tooShort: "Por favor, preencha um e-mail válido."
        }
    }

    const tiposDeErro = [
        'valueMissing',
        'typeMismatch',
        'patternMismatch',
        'tooShort',
        'customError'
    ]

    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == "data" && campo.value != ""){
        checagemDeIdade(campo);
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagemDeErro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput){
        mensagemErro.textContent = mensagem;
        return false;
    }else{
        mensagemErro.textContent = "";
        return true
    }

}

function checagemDeIdade(campo){
    const dataNascimento = new Date(campo.value);

    if(validaIdade(dataNascimento) == false){
        campo.setCustomValidity('Insira uma idade real (acima de 13 anos)');
    }
}

function validaIdade(data){
    const dataAtual = new Date();
    const data14 = new Date(data.getUTCFullYear() + 14, data.getUTCMonth(), data.getUTCDate());
  

    if(dataAtual < data14 ){
        return false;
    }
}