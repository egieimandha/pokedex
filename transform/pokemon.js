import { BASE_URL, IMAGE_URI } from '../constants/api'

const getIdPokemon = (uri) => {
  return uri.replace(`${BASE_URL}pokemon/`, '').replace('/','')
}

export const transformPokemonWithImage = (pokemons) => {
  resultPokemons = []
  if (pokemons.length > 1 ){
    pokemons.map((pokemon) => {
      let pokemonId = getIdPokemon(pokemon.url)
      let resultPokemon = {
        id: pokemonId,
        name: pokemon.name,
        imageUri: `${IMAGE_URI}${pokemonId}.png`

      }
      resultPokemons.push(resultPokemon)
    })
  }
  return resultPokemons
}