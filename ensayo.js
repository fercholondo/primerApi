
const axios=require ('axios')
async function showDetails() {
    try {
        //se realiza el consumo de la API principal
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
        
        const pokemonData = response.data;



       
        //Nombre Pokemon
        const nombre = pokemonData.name;
         //ID pokemon
         const pokemonId = pokemonData.id;


        //Habilidades Pokemon
        const habilidades = pokemonData.abilities;

        let habilidadesTxt = "";
        for (let i = 0; i < habilidades.length; i++) {
            if (i > 0) {
                habilidadesTxt += ", "; 
            }
            habilidadesTxt += habilidades[i].ability.name;
        }

        //imagen pokemon
        const image = pokemonData.sprites.other['official-artwork'].front_default;

        console.log('el id del pokemon es ' + pokemonId+ 'Su nombre es ' + nombre + 'y tiene estas habilidades'+ habilidadesTxt)
        console.log('la url de la imagen es ' + image)

    } catch (error) {
        // Manejo de errores
        console.error("Error al buscar el pokemon:", error);     
    }
}

showDetails()

