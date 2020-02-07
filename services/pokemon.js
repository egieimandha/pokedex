import { BASE_URL } from '../constants/api'

export const fetchAllPokemon = (next, limit=50) => {
  if (next) return fetch(next).then(res => res.json())
  else return fetch(`${BASE_URL}/pokemon?limit=${limit}`).then(res => res.json())
}

export const fetchOnePokemon = (pokemonId) => {
  return fetch(`${BASE_URL}/pokemon/${pokemonId}`).then(res => res.json())
}

export const fetchAllPokemonType = () => {
  return fetch(`${BASE_URL}/type`).then(res => res.json())
}

export const fetchAllPokemonWithType = (type) => {
  return fetch(`${BASE_URL}/type/${type}`).then(res => res.json())
}
