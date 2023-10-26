async function consumeApiWithFetch(url){
    try{
        const respuesta = await fetch(url);
        console.log(`la petición a la api se completó correctamente con status: ${respuesta.status}`);
        return await respuesta.json();
    } catch(error){
        console.error(`fallo la petición a la api con error: ${error.message}`);
    }    
}

const resp = consumeApiWithFetch('https://pokeapi.co/api/v2/pokemon/rayquaza');

async function obtenerDatosRespuesta(respuesta){
        const respuestaApi = await respuesta;
        const datosRespuesta=respuestaApi;
        console.log('id=', datosRespuesta)
        return datosRespuesta
 }

const pokemonData = obtenerDatosRespuesta(resp);





//ID pokemon
const idPokemon = pokemonData.id;

//Nombre Pokemon
const nombre = pokemonData.name;


//Habilidades Pokemon
const habilidades = pokemonData.abilities;
let habilidadesTexto = "";
/*for (let i = 0; i < habilidades.length; i++) {
    if (i > 0) {
        habilidadesTexto += ", "; 
    }
    habilidadesTexto += habilidades[i].ability.name;
}*/