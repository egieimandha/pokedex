import React from "react"
import "react-native"
import {
  RenderDetailWithOneValuePokemon,
  RenderTypeName,
  RenderDetailWithMultipleValuePokemon,
  RenderDetailPokemon,
  RenderPokemon,
  RenderListPokemon,
  RenderContainerDetailPokemon
} from '../../screens/ComponentPokemon'
import BodyRegular from "../../components/UI/BodyRegular"
import renderer from 'react-test-renderer'


describe('Components Pokemon', () => {
  const mockHandleRefresh = jest.fn()
  const mockHandleLoadMore = jest.fn()
  const mockHandleSelectedPokemon = jest.fn()
  const mockPokemons = [
    {
      "id": "4",
      "imageUri": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      "name": "charmander",
    },
   {
      "id": "5",
      "imageUri": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
      "name": "charmeleon",
    },
   {
      "id": "6",
      "imageUri": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
      "name": "charizard",
    }
  ]
  const mockSelectedPokemonId = 6
  const mockSelectedPokemon = {
    name: 'charizard',
    height: '17',
    weight: '905',
    types: [
      {
        slot: 1,
        type: {
          name: 'Flying'
        }
      },
      {
        slot: 2,
        type: {
          name: 'Fire'
        }
      }
    ]
  }
  const mockRenderItemPokemon = ({ item }) => {
    return <RenderPokemon
      pokemon={item}
      handleSelectedPokemon={mockHandleSelectedPokemon}
      selectedPokemonId={mockSelectedPokemonId}
    />
  }
  describe('Render Detail With One Value Pokemon snapshot', () => {
    const mockText = 'Height'
    const mockHeight = '17'
    const testRenderDetailWithOneValuePokemon = renderer.create(
      <RenderDetailWithOneValuePokemon text={mockText} value={mockSelectedPokemon.height} />
    )
    it('should be match to snapsot', () => {
      expect(testRenderDetailWithOneValuePokemon.toJSON()).toMatchSnapshot()
    })
    it('text must be same with props', () => {
      const instance = testRenderDetailWithOneValuePokemon.root
      expect(instance.findAllByType(BodyRegular)[0].props.children).toBe(mockText)
    })
    it('value must be same with props', () => {
      const instance = testRenderDetailWithOneValuePokemon.root
      expect(instance.findAllByType(BodyRegular)[1].props.children).toBe(mockSelectedPokemon.height)
    })
    it('should be render nothing if props is empty', () => {
      const testRenderDetailWithOneValuePokemon = renderer.create(
        <RenderDetailWithOneValuePokemon />
      )
      expect(testRenderDetailWithOneValuePokemon.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render Type Name', () => {
    const testRenderTypeName = renderer.create(
      <RenderTypeName name={mockSelectedPokemon.types[0].type.name} />
    )
    it('should be match to snapsot', () => {
      expect(testRenderTypeName.toJSON()).toMatchSnapshot()
    })
    it('name must be same with props', () => {
      const instance = testRenderTypeName.root
      expect(
        instance.findAllByType(BodyRegular)[0].props.children)
          .toBe(mockSelectedPokemon.types[0].type.name.toUpperCase()
      )
    })
    it('should be render nothing with label X if have prop isFilter', () => {
      const testRenderTypeName = renderer.create(
        <RenderTypeName name={mockSelectedPokemon.types[0].type.name} isFilter />
      )
      expect(testRenderTypeName.toJSON()).toMatchSnapshot()
    })
    it('should be render nothing if props is empty', () => {
      const testRenderTypeName = renderer.create(
        <RenderTypeName />
      )
      expect(testRenderTypeName.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render Detail With Multiple Value Pokemon snapshot', () => {
    const mockText = 'Type'
    const testRenderDetailWithMultipleValuePokemon = renderer.create(
      <RenderDetailWithMultipleValuePokemon text={mockText} value={mockSelectedPokemon.types} />
    )
    it('should be match to snapsot', () => {
      expect(testRenderDetailWithMultipleValuePokemon.toJSON()).toMatchSnapshot()
    })
    it('name must be same with props', () => {
      const instance = testRenderDetailWithMultipleValuePokemon.root
      expect(instance.findAllByType(BodyRegular)[0].props.children).toBe(mockText)
    })
    it('name type must be same with props', () => {
      const instance = testRenderDetailWithMultipleValuePokemon.root
      expect(
        instance.findAllByType(BodyRegular)[1].props.children)
          .toBe(mockSelectedPokemon.types[0].type.name.toUpperCase()
      )
    })
    it('should be render nothing if props is empty', () => {
      const testRenderDetailWithMultipleValuePokemon = renderer.create(
        <RenderDetailWithMultipleValuePokemon />
      )
      expect(testRenderDetailWithMultipleValuePokemon.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render Detail Pokemon', () => {
    const testRenderDetailPokemon = renderer.create(
      <RenderDetailPokemon selectedPokemon={mockSelectedPokemon} />
    )
    it('should be match to snapsot', () => {
      expect(testRenderDetailPokemon.toJSON()).toMatchSnapshot()
    })
    it('name pokemon must be same with props', () => {
      const instance = testRenderDetailPokemon.root
      expect(
        instance.findAllByType(BodyRegular)[0].props.children)
          .toBe(mockSelectedPokemon.name.toUpperCase()
      )
    })
    it('should be render nothing if props is empty', () => {
      const testRenderDetailPokemon = renderer.create(
        <RenderDetailPokemon />
      )
      expect(testRenderDetailPokemon.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render Pokemon', () => {
    const testRenderPokemon = renderer.create(
      <RenderPokemon selectedPokemon={mockPokemons[2]} handleSelectedPokemon={mockHandleSelectedPokemon} />
    )
    it('should be match to snapsot', () => {
      expect(testRenderPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be render frame selected if props equals to pokemon.id', () => {
      const testRenderPokemon = renderer.create(
        <RenderPokemon selectedPokemon={mockPokemons[2]} selectedPokemonId={mockSelectedPokemonId} />
      )
      expect(testRenderPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be render nothing if props is empty', () => {
      const testRenderPokemon = renderer.create(
        <RenderPokemon />
      )
      expect(testRenderPokemon.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render list Pokemons', () => {
    const testRenderListPokemon = renderer.create(
      <RenderListPokemon
        pokemons={mockPokemons}
        RenderItemPokemon={mockRenderItemPokemon}
        handleRefresh={mockHandleRefresh}
        handleLoadMore={mockHandleLoadMore}
        refreshing={false}
      />
    )
    it('should be match to snapsot', () => {
      expect(testRenderListPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be activity indicator if resfeshing true', () => {
      const testRenderListPokemon = renderer.create(
        <RenderListPokemon pokemons={mockPokemons} refreshing={true} />
      )
      expect(testRenderListPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be render nothing if props is empty', () => {
      const testRenderListPokemon = renderer.create(
        <RenderListPokemon />
      )
      expect(testRenderListPokemon.toJSON()).toMatchSnapshot()
    })
  })
  describe('Render Container Detail Pokemons', () => {
    it('should be match to snapsot', () => {
      const testRenderContainerDetailPokemon = renderer.create(
        <RenderContainerDetailPokemon selectedPokemon={mockSelectedPokemon} loaderPokemonDetail={false} />
      )
      expect(testRenderContainerDetailPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be activity indicator if loaderPokemonDetail true', () => {
      const testRenderContainerDetailPokemon = renderer.create(
        <RenderContainerDetailPokemon selectedPokemon={mockSelectedPokemon} loaderPokemonDetail={true} />
      )
      expect(testRenderContainerDetailPokemon.toJSON()).toMatchSnapshot()
    })
    it('should be render placeholder if props is empty', () => {
      const testRenderContainerDetailPokemon = renderer.create(
        <RenderContainerDetailPokemon />
      )
      expect(testRenderContainerDetailPokemon.toJSON()).toMatchSnapshot()
    })
  })
})