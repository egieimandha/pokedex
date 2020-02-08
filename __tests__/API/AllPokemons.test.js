import Pokemon from '../../services/pokemon'
describe('fetch all pokemon', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve({
        json: function (){
          return {
            count: 7,
            next: 'https://pokeapi.co/api/v2/pokemon?offset=6&limit=3',
            previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=3',
            results: [
              {
                name:"charmander",
                url:"https://pokeapi.co/api/v2/pokemon/4"
              },
              {
                name:"charmeleon",
                url:"https://pokeapi.co/api/v2/pokemon/5"
              },
              {
                name:"charizard",
                url:"https://pokeapi.co/api/v2/pokemon/6"
              }
            ]
          }
        }
      })
    })
    return promise
  })
  it('count pokemons', async function() {
    const response = await Pokemon.getAllPokemon('https://pokeapi.co/api/v2/pokemon?offset=3&limit=3')
    expect(response.count).toBe(7)
  })
  it('have pokemon charizard', async function() {
    const response = await Pokemon.getAllPokemon()
    expect(response.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'charizard'
        })
      ])
    )
  })
})