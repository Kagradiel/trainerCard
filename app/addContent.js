import { consultaApi } from "./pokeAPI.js";

export async function buscaLinguagensValidas(){
    const variavelDePesquisa   = 'language';
    let i = 0;

    const resultado = await consultaApi(variavelDePesquisa);
    const anyIndex = resultado.results;
    const linguasArray = [];

    anyIndex.map(anything => {
        linguasArray[i] = anything.name;
        i++;    
    });

    return linguasArray
}

//Adiciono linguas com tradução de elementos na primeira pagina
export async function adicionaLinguas(){

    const   linguas             = document.querySelector("[data-lingua]"); 
    const   linguasArray        = await buscaLinguagensValidas();
    let     linguaEscolhida     = linguasArray[8];
    let     info                = [];
    
    info  = JSON.parse(localStorage.getItem('Informações pessoais')) || [];

    linguas.innerHTML += 
            `
                <option value="13">Portugues</option>
            `
            
    linguasArray.forEach(async lingua =>{
        
        const variavelDePesquisa = 'language/'+lingua;
        
        const resultado = await consultaApi(variavelDePesquisa);
        
        
            resultado.names.forEach( nome =>{
                if(resultado.official == true && nome.language.name == linguaEscolhida){
                    addOuRecuperaSelects(info, "lang", resultado.id, linguas, nome.name);
                }
            })
        }
    )}

export async function adicionaSegundaPagina(){   
    const regiao = document.querySelector("[data-regiao]"); 
    let     info                = [];

    info  = JSON.parse(localStorage.getItem('Registro de cidadania')) || [];
    
    await adicionarRegiao(regiao, info);
    await adicionaTipo(info);

    regiao.addEventListener('change', async () => {
        await adicionaCidade(regiao, info);
    })
}

async function adicionarRegiao(regiao, info){
    const   variavelDePesquisa  = 'region';
    const   resultado           = await consultaApi(variavelDePesquisa);
    
    
    

    resultado.results.forEach( nome =>{
        //removendo hisui temporariamente devido a dificuldade de achar nomes de cidades
        if(nome.name != 'hisui' && nome.name != 'galar' && nome.name != 'paldea'){
                
            addOuRecuperaSelects(info, "regiao", acharIdPeloUrl(nome), regiao, nome.name);

        }
    })
    await adicionaCidade(regiao, info);
}

async function adicionaCidade(regiao, info){
    const cidade                = document.querySelector("[data-cidade]");
    const variavelDePesquisa    = `region/${regiao.value}`;
    const resultado             =  await consultaApi(variavelDePesquisa);
    cidade.innerHTML='';

        resultado.locations.forEach( e =>{        
            
            if(e.name.includes("city") || e.name.includes("town")){
                let city = e.name.replaceAll("-", ' ')
                addOuRecuperaSelects(info, "cidade", acharIdPeloUrl(e), cidade, city);
            }
        })

}

async function adicionaTipo(info){
    const tipo                  = document.querySelector("[data-tipo]");
    const variavelDePesquisa    = "type";
    const resultado             = await consultaApi(variavelDePesquisa);
  

    resultado.results.forEach( type =>{

        addOuRecuperaSelects(info, "tipo", acharIdPeloUrl(type), tipo, type.name);
         
    })
}

function addOuRecuperaSelects(info, variavelEspecifica, id, campo, opcoes){


    if(info != []){
        Object.entries(info).forEach(([key, value]) => {
            if(key == variavelEspecifica){
                if(value == id){
                    campo.innerHTML += 
                    `
                    <option value="${id}" selected>${opcoes}</option>
                    `;
                    
                    
                }     
                else{
                    campo.innerHTML += 
                    `
                        <option value="${id}">${opcoes}</option>
                    `;
                }   
            }
        })
    }
    else{
        campo.innerHTML += 
        `
            <option value="${id}">${opcoes}</option>
        `;
    }   
}

function acharIdPeloUrl(variavel){
    return  variavel.url
            .split("")
            .reverse()
            .join("")
            .split("/", 2)[1];
}