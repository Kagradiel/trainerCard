import { adicionaLinguas, adicionaSegundaPagina} from "./addContent.js";
import { filtrarFormulario } from "./filtroDeFormulario.js";
import { salvarDados } from "./salvarDados.js";


criarBaseDoFormulario();

function criarBaseDoFormulario(){
    let estadoFormulario = {
        paginaAtual: 3, // Inicia na página 1
        dados: {} // Objeto para armazenar os dados do formulário
    };
    const main = document.querySelector("main");
    main.innerHTML=
    `
    <section class="principalCadastro">
                
        <div class="containerAvanco">
            <h1>Registro de treinador</h1>
            <ul>
                <li class="isActive" data-etapa>Informações Pessoais</li>
                <li data-etapa>Registro de Cidadania</li>
                <li data-etapa>Pokemon Inicial</li>
            </ul>
        </div>

        <form class="formularioDeInformacoesPessoais" data-formulario autocomplete="off">
            

        </form>

    </section>
    `
    console.log(estadoFormulario);
    exibirFormulario(estadoFormulario);
}

function avancarOuRetornar(estadoFormulario){
    const formulario        = document.querySelector("[data-formulario]");
    const cancelar          = document.querySelector("[data-cancelar]");
    console.log(estadoFormulario);
    
    if(formulario){

        formulario.addEventListener('submit', (dados) =>{
            salvarDados(dados, estadoFormulario);
            if(estadoFormulario.paginaAtual >= 3){
                return;
            }else{
                estadoFormulario.paginaAtual += 1;
                exibirFormulario(estadoFormulario);
                recuperarInfo(estadoFormulario);
            }
        });
    }

    cancelar.addEventListener('click', () =>{
        if(estadoFormulario.paginaAtual === 1){
            return;
        }else if(estadoFormulario.paginaAtual <= 3) {
            if(estadoFormulario.paginaAtual == 3){
                const formImgDePerfil = document.querySelector(".fotoPerfil");
                    formImgDePerfil.classList.remove("fotoPerfil");
                    formImgDePerfil.innerHTML="";
                }
            
            estadoFormulario.paginaAtual -= 1;
            exibirFormulario(estadoFormulario);
            recuperarInfo(estadoFormulario);
        }
    });
}

function exibirFormulario(estadoFormulario){
;
    
    if(estadoFormulario.paginaAtual === 1 ){
        criarPrimeiroFormulario(estadoFormulario);
    }else if(estadoFormulario.paginaAtual === 2){
        criarSegundoFormulario(estadoFormulario);
    }else{
        criarTerceiroFormulario(estadoFormulario);
    }
}


async function criarPrimeiroFormulario(estadoFormulario){
    const formulario        = document.querySelector("[data-formulario]");
    const indiceFormulario  = document.querySelectorAll("[data-etapa]");



    indiceFormulario[1].classList.remove('isActive');
    formulario.innerHTML='';
    formulario.classList.remove('formularioDeRegistroDeCidadania');
    formulario.classList.add('formularioDeInformacoesPessoais');
    formulario.innerHTML= 
    `
        <fieldset id="nomeCadastro">
        <label for="nome" class="tituloCampo">Nome:</label>
        <input name="nome" id="nome" type="text" class="dadosDoCampo" minlength="2" required/>
        <span class="mensagemDeErro"></span>
        </fieldset>

        <fieldset id="usuarioCadastro">
            <label for="user" class="tituloCampo">Usuário para login:</label>
            <input name="user" id="user" type="text" class="dadosDoCampo" required/>
            <span class="mensagemDeErro"></span>
        </fieldset>

        <fieldset id="senhaCadastro">
            <label for="senha" class="tituloCampo">Senha:</label>
            <input name="senha" id="senha" type="password" class="dadosDoCampo" required/>
            <span class="mensagemDeErro"></span>
        </fieldset>

        <fieldset id="dataCadastro">
            <label for="data" class="tituloCampo">Data de nascimento:</label>
            <input name="data" id="data" type="date" class="dadosDoCampo" required/>
            <span class="mensagemDeErro"></span>
        </fieldset>
  

        <fieldset id="linguaCadastro">
            <label for="lang" class="tituloCampo">Lingua:</label>
            <select name="lang" id="lang" class="dadosDoCampo" data-lingua>
                
            </select>
        </fieldset>

        <fieldset id="emailCadastro">
            <label for="email" class="tituloCampo">Email:</label>
            <input name="email" id="email" type="email" class="dadosDoCampo" minlength="4" required/>
            <span class="mensagemDeErro"></span>
        </fieldset>

        <div class="containerBotoes">
            <div>
                <input type="submit" class="botaoCadastro" id="enviar" value="confirmar" data-botao-confirmar>
                <span class="mensagemDeErro"></span>
            </div>

            <a href="../index.html" class="botaoCadastro" data-cancelar>Cancelar</a>
        </div>

        `;

    await adicionaLinguas();
    filtrarFormulario() 
    avancarOuRetornar(estadoFormulario);
}

async function criarSegundoFormulario(estadoFormulario){
    const formulario        = document.querySelector("[data-formulario]");
    const indiceFormulario  = document.querySelectorAll("[data-etapa]");


    indiceFormulario[1].classList.add('isActive');
    formulario.innerHTML='';
    formulario.classList.remove('formularioDeInformacoesPessoais');
    formulario.classList.add('formularioDeRegistroDeCidadania');
    formulario.innerHTML=
    `   
        <fieldset id="regiaoCadastro">
            <label for="regiao" class="tituloCampo">Região:</label>
            <select name="regiao" id="regiao" data-regiao>
            </select>
        </fieldset>

        <fieldset id="cidadeCadastro">
            <label for="cidade" class="tituloCampo">Cidade:</label>
            <select name="cidade" id="cidade" data-cidade>
            </select>
        </fieldset>
        
        <fieldset id="tipoCadastro">
            <label for="tipo" class="tituloCampo">Tipo:</label>
            <select name="tipo" id="tipo" data-tipo>
            </select>
        </fieldset>

        <div class="containerBotoes">
            <div>
                <input type="submit" class="botaoCadastro" id="enviar" value="confirmar" data-botao-enviar>
                <span class="mensagemDeErro"></span>
            </div>

            <button class="botaoCadastro" data-cancelar>Cancelar</a>
        </div>
    `
    ;

    adicionaSegundaPagina();
    avancarOuRetornar(estadoFormulario);
}

function criarTerceiroFormulario(estadoFormulario){
    const main = document.querySelector("main");
    
    main.innerHTML +=
    `
        <section class="fotoPerfil">
            <div>
                <button id="cancelar" data-cancelar>X</button>
                <h2> Escolha a imagem de perfil</h2>
                <ul>
                    <li>
                        <button>Tirar Foto</button>
                    </li>
                    <li>
                        <button>Usar imagem padrão</button>
                    </li>
                </ul>
            </div>
        </section>
        
    `

    avancarOuRetornar(estadoFormulario);

}

function recuperarInfo(estadoFormulario){
    let info = [];
    console.log(estadoFormulario.paginaAtual);
    if(estadoFormulario.paginaAtual == 1){
        info  = JSON.parse(localStorage.getItem('Informações pessoais')) || [];
    }else if(estadoFormulario.paginaAtual == 2){
        info  = JSON.parse(localStorage.getItem('Registro de cidadania')) || [];
    }

    const form = document.querySelectorAll(".dadosDoCampo");


    Object.entries(info).forEach(([key, value]) => {
        form.forEach(campo => {
            if(campo.name === key){
                campo.value = value;
            }
        });
    });
}

