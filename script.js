async function consumeApiWithFetch(url){
    try{
        const respuesta = await fetch(url);
        console.log(`la petición a la api se completo correctamente con status: ${respuesta.status}`);
        return await respuesta.json();
    } catch(error){
        console.error(`fallo la petición a la api con error: ${error.message}`);
    }    
}

const resp = consumeApiWithFetch('https://pokeapi.co/api/v2/pokemon/pikachu');
console.log (resp);
async function obtenerDatosRespuesta(respuesta){
        const respuestaApi = await respuesta;
        const datosRespuesta=respuestaApi.data;
        for (dato of datosRespuesta){
        console.log(dato);}
 }
obtenerDatosRespuesta(resp)