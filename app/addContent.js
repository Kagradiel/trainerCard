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

    const linguasArray = await buscaLinguagensValidas();
    let   linguaEscolhida   = linguasArray[8];

    const linguas = document.querySelector("[data-lingua]"); 
    
    linguas.innerHTML += 
            `
                <option value="13">Portugues</option>
            `
            
    linguasArray.forEach(async lingua =>{
        
        const variavelDePesquisa = 'language/'+lingua;
        
        const resultado = await consultaApi(variavelDePesquisa);

        let i = 0;
        
            resultado.names.forEach( nome =>{
                
                if(resultado.official == true && nome.language.name == linguaEscolhida){
                    linguasArray[i] = nome.name;
                    linguas.innerHTML += 
                    `
                        <option value="${resultado.id}">${linguasArray[i]}</option>
                    `
                    i++;
                }
            })
        }
    )}

export function adicionaSegundaPagina(){   
    const regiao = document.querySelector("[data-regiao]"); 
    
    adicionarRegiao(regiao);
    adicionaTipo();

    regiao.addEventListener('change', () => {
        adicionaCidade(regiao);
    })
}

async function adicionarRegiao(regiao){
    const variavelDePesquisa   = 'region';
    const resultado         = await consultaApi(variavelDePesquisa);
    let i = 1;
    
    
    resultado.results.forEach( nome =>{
        //removendo hisui temporariamente devido a dificuldade de achar nomes de cidades
        //valor de paldea aumentado para sincronia com a descoberta de cidade devido a remoção de hisui
        if(nome.name != 'hisui'){
            if(nome.name != 'paldea'){
                regiao.innerHTML +=
                `
                    <option value="${i}">${nome.name}</option> 
                `
                i++;
            }else{
                regiao.innerHTML +=
                `
                    <option value="${i+1}">${nome.name}</option> 
                `
                i++;
            }
        }
    })
    adicionaCidade(regiao);
}

async function adicionaCidade(regiao){
    const cidade                = document.querySelector("[data-cidade]");
    const variavelDePesquisa    = `region/${regiao.value}`;
    const resultado             =  await consultaApi(variavelDePesquisa);
    let   i                     =  1;
    cidade.innerHTML='';


    if(regiao.value <= 7){

        resultado.locations.forEach( e =>{        
            
            if(e.name.includes("city") || e.name.includes("town")){
                let city = e.name.replaceAll("-", ' ')
                cidade.innerHTML +=
                `
                    <option value="${i}">${city}</option>
                `
                i++;


            }
        })

    }else{

        resultado.locations.forEach( city =>{        
            
            if(city.name.indexOf("-") ==  -1){
                cidade.innerHTML +=
                `
                    <option value="${i}">${city.name}</option>
                `
                i++;

            }
        })

    }
}

async function adicionaTipo(){
    const tipo              = document.querySelector("[data-tipo]");
    const variavelDePesquisa   = "type";
    const resultado         = await consultaApi(variavelDePesquisa);
    let i = 1;
  

    resultado.results.forEach( type =>{
        
        tipo.innerHTML +=
        `
            <option value="${i}">${type.name}</option>
        `
        i++;
         
    })
}