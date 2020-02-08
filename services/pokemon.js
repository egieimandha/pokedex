import { BASE_URL } from '../constants/api'
class Pokemon{
  static getAllType() {
    return fetch(`${BASE_URL}/type`)
      .then((response) => {
        return response.json()
      })
  }
  static getAllPokemonWithType(type) {
    return fetch(`${BASE_URL}/type/${type}`)
      .then((response) => {
        return response.json()
      })
  }
  static getAllPokemon(next, limit=50) {
    if (next) {
      return fetch(next)
      .then((response) => {
        return response.json()
      })
    } else {
      return fetch(`${BASE_URL}/pokemon?limit=${limit}`)
      .then((response) => {
        return response.json()
      })
    }
  }
  static getOnePokemon(pokemonId) {
    return fetch(`${BASE_URL}/pokemon/${pokemonId}`)
      .then((response) => {
        return response.json()
      })
  }
}

export default Pokemon