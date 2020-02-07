import { BASE_URL } from '../constants/api'

export const fetchAllPokemon = (next, limit=50) => {
  if (next) return fetch(next).then(res => res.json())
  else return fetch(`${BASE_URL}/pokemon?limit=${limit}`).then(res => res.json())
}