var proximaEvolucion=""
//const nombrePokemon=document.getElementById("nombrePokemon")
//nombrePokemon.innerHTML=nombre
async function showPokemonDetails(pokemonName) {
    try { 
        //se realiza el consumo de la API principal
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = response.data;


        //ID pokemon
        const idPokemon = pokemon.id;

        //Nombre Pokemon
        const nombre = pokemon.name;

        //Habilidades Pokemon
        const habilidad = pokemon.abilities;

        let habilidadTexto = "";
        for (let i = 0; i < habilidad.length; i++) {
            if (i > 0) {
                habilidadTexto += ", "; 
            }
            habilidadTexto += habilidad[i].ability.name;
        }

        //Consumimos el api de species para poder obtener la descripcion del pokemon y la url de la cadena de evolucion
        const pokemonDescription = await getPokemonDescription(idPokemon)
        //Descripcion
        const descripcion = pokemonDescription.flavorText.replace(/[\n\s]+/g, ' ');
        //Url con la cadena de evolucion para poder conusmir la tercer API
        const urlCadenaEvolucion =  pokemonDescription.evolutionChain
        //Url pokemon
        const imageUrl = pokemon.sprites.other['official-artwork'].front_default;

        const cadenaEvolucion = await getEvolutions(urlCadenaEvolucion)
        document.getElementById("nombrePokemon").innerHTML=nombre 
        document.getElementById("descripcion").innerHTML=descripcion
        document.getElementById("imagen").src=imageUrl
        document.getElementById("habilidad").innerHTML=habilidadTexto
        document.getElementById("evolucion").innerHTML=cadenaEvolucion
        document.getElementById("master").hidden=false
    



        console.log('id ' + idPokemon + ' Su nombre es ' + nombre + ' y tiene estas habilidades '+ habilidadTexto)
        console.log('url de imagen' + imageUrl)
        console.log('descripcion ' + descripcion)
        console.log('Url para consumir el api de evoluciones ' + urlCadenaEvolucion)
        console.log('posibles evoluciones ' + cadenaEvolucion)
        
        
        verificarEvolucion(cadenaEvolucion,nombre)
        

    } catch (error) {
        // Manejo de errores
        console.error("Error al buscar el pokemon:", error);   
        window.alert("Error al buscar el pokemon o no existe")  
    }
}
async function verificarEvolucion(cadenaEvolucion,nombre){
    try {
        const longitudEvolucion=(Object.keys(cadenaEvolucion).length)
        var posicionNombre=longitudEvolucion
        for (var i = 0; i < longitudEvolucion; i++) 
         {
           if(cadenaEvolucion[i]==nombre)
           { 
                posicionNombre=i
                break
            }
        
          }
        if (posicionNombre<longitudEvolucion-1)
        {document.getElementById("botonEvolucion").hidden=false
        proximaEvolucion=cadenaEvolucion[posicionNombre+1]
        document.getElementById("tituloEvolucion").hidden=false
        }
        else
            {proximaEvolucion=""
            document.getElementById("botonEvolucion").hidden=true
            document.getElementById("tituloEvolucion").hidden=true        
        }
            console.log("tipo de variable proxima evolucion"+typeof(proximaEvolucion))

            
    } catch (error) {
        // Manejo de errores
        console.error("Error al buscar evolucion", error);   
        window.alert("Error al buscar evolucion")  
    }
}
async function nameEvolution(){
    showPokemonDetails(proximaEvolucion); 
    

}

async function searchFunction() {
    var element=document.getElementById("idSearch").value;
  
    //element=toString.element
   
    //const element ="pikachu"
    //element=element.toLowerCase();
   
    showPokemonDetails(element);
    
     
    
  }
async function goToHome(){
    document.getElementById("master").hidden=true
    document.getElementById("botonEvolucion").hidden=true
    document.getElementById("idSearch").value=""
   
}

async function getPokemonDescription(id_pokemon){
    try{
        // Consumo el API de species para obtener descripción y URL de cadena de evolución
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id_pokemon}`);

        // Depuración necesaria para ir entendiendo y saber cómo manejar los datos que recibes
        console.log(`La petición a la API se completó correctamente con status: ${response.status}`);

        // Filtra el primer flavor text en inglés
        const flavorTextEntries = response.data['flavor_text_entries'];
        let spanishFlavorText = '';
        for (const entry of flavorTextEntries) {
            if (entry.language.name === 'es') {
                spanishFlavorText = entry.flavor_text;
                break; // Al encontrar el primer entry en ingles, lo extraigo
            }
        }

        // Extraigo los datos de interés
        const data = {
            flavorText: spanishFlavorText,
            evolutionChain: response.data['evolution_chain']['url'],
        };

        // Los retorno de la función
        return data;

    } catch(error){
        //Mostrar error de campo vacio
        console.error(`fallo la petición a la api con error: ${error.message}`);
    }    
}

async function getEvolutions(evolutionChainUrl) {
    try {
        //Consumo el API de de cadena de evolucion
        const response = await axios.get(evolutionChainUrl);

        //depuracion necesaria para ir entendiendo y saber como manejar los datos que recibia 
        console.log(`La petición a la cadena de evolución se completó correctamente con status: ${response.status}`);
        
        //Extraer el arreglo con la cadena de evolucion
        const chainData = response.data.chain;
        const evolutions = [];
        
        //Funcion para extraer los nombres de los pokemons en orden de evolucion
        function extractEvolutions(chain) {
            if (chain.species && chain.species.name) {
                evolutions.push(chain.species.name);
            }
            if (chain.evolves_to && chain.evolves_to.length > 0) {
                chain.evolves_to.forEach(subchain => {
                    extractEvolutions(subchain);
                });
            }
        }
        
        //Ejecutamos la funcion
        extractEvolutions(chainData);
        
        //Retorno la evolucion
        return evolutions;

    } catch (error) {
        //muestra el error
        console.error(`falló la petición a la api con error: ${error.message}`);
    }
}

