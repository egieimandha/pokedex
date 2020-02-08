import Pokemon from '../../services/pokemon'
describe('fetch all type pokemon', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    let promise = new Promise((resolve, reject) => {
      resolve({
        json: function (){
          return {
            count:3,
            next:null,
            previous:null,
            results: [
              {
                name:"normal",
                url:"https://pokeapi.co/api/v2/type/1/"
              },
              {
                name:"fighting",
                url:"https://pokeapi.co/api/v2/type/2/"
              },
              {
                name:"fire",
                url:"https://pokeapi.co/api/v2/type/10/"
              }
            ]
          }
        }
      })
    })
    return promise
  })
  it('count types', async function() {
    const response = await Pokemon.getAllType()
    expect(response.count).toBe(3)
  })
  it('have type fire', async function() {
    const response = await Pokemon.getAllType()
    expect(response.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'fire'
        })
      ])
    )
  })
})