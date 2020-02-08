import Pokemon from '../../services/pokemon'
describe('fetch all pokemon with specific type', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve({
        json: function (){
          return {
            name: 'fire',
            pokemon:[
              {
                slot: 1,
                pokemon: {
                  name: 'charmander'
                }
              },
              {
                slot: 1,
                pokemon: {
                  name: 'charmeleon'
                }
              },
              {
                slot: 1,
                pokemon: {
                  name: 'charizard'
                }
              }
            ]
          }
        }
      })
    })
    return promise
  })
  it('type name fire', async function() {
    const response = await Pokemon.getAllPokemonWithType('fire')
    expect(response.name).toBe('fire')
  })
  it('have pokemon with fire type', async function() {
    const response = await Pokemon.getAllPokemonWithType('fire')
    expect(response.pokemon).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          pokemon: {
            name: 'charizard'
          }
        })
      ])
    )
  })
})