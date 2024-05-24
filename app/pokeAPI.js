export async function consultaApi(variavelDePesquisa){
    const pokemon           = await fetch(`https://pokeapi.co/api/v2/${variavelDePesquisa}`);
    const resultado         = await pokemon.json();

    return resultado
}