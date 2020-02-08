import Pokemon from '../../services/pokemon'
describe('fetch one pokemon', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve({
        json: function (){
          return {
            name: 'charizard',
            weight: 905,
            height: 17,
            types: [
              {
                type: {
                  name: 'flying'
                }
              },
              {
                type: {
                  name: 'fire'
                }
              }
            ]
          }
        }
      })
    })
    return promise
  })
  it('name of pokemon', async function() {
    const response = await Pokemon.getOnePokemon(6)
    expect(response.name).toBe('charizard')
  })
  it('weight of pokemon', async function() {
    const response = await Pokemon.getOnePokemon(6)
    expect(response.weight).toBe(905)
  })
  it('height of pokemon', async function() {
    const response = await Pokemon.getOnePokemon(6)
    expect(response.height).toBe(17)
  })
  it('type of pokemon', async function() {
    const response = await Pokemon.getOnePokemon(6)
    expect(response.types).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: {
            name: 'fire'
          }
        })
      ])
    )
  })
})