import React from "react"
import { StyleSheet, Image, TouchableOpacity } from "react-native"
import { Item } from "../components/index"
import BodyRegular from "../components/UI/BodyRegular"
import Colors from '../constants/colors'

const RenderDetailWithOneValuePokemon = ({ text, value }) => (
  <Item plain row style={styles.detailBox}>
    <Item backgroundColor={Colors.lightGrey} center small width={'30%'}>
      <BodyRegular>{text}</BodyRegular>
    </Item>
    <Item small row horizontal width={'70%'}>
      <BodyRegular>{value}</BodyRegular>
    </Item>
  </Item>
)

const RenderDetailWithMultipleValuePokemon = ({ text, value }) => (
  <Item plain row style={styles.detailBox}>
    <Item backgroundColor={Colors.lightGrey} center small width={'30%'}>
      <BodyRegular>{text}</BodyRegular>
    </Item>
    <Item small row horizontal width={'70%'}>
      {
        value.map((data) => {
          return (
            <Item key={data.slot} plain style={styles.multipleContainerText}>
              <BodyRegular style={{ color: Colors.primary }}>{data.type.name.toUpperCase()}</BodyRegular>
            </Item>
          )
        })
      }
    </Item>
  </Item>
)

export const RenderDetailPokemon = ({ selectedPokemon }) => {
  return selectedPokemon && (
    <Item plain>
      <Item plain>
        <Item width={'100%'} small center backgroundColor={Colors.lightGrey}>
          <BodyRegular>{selectedPokemon.name.toUpperCase()}</BodyRegular>
        </Item>
      </Item>
      <RenderDetailWithMultipleValuePokemon text={'Type'} value={selectedPokemon.types} />
      <RenderDetailWithOneValuePokemon text={'Height'} value={`${selectedPokemon.height}"`} />
      <RenderDetailWithOneValuePokemon text={'Weight'} value={`${selectedPokemon.weight} lbs.`} />
    </Item>
  )
}

export const RenderPokemon = ({ pokemon, handleSelectedPokemon, selectedPokemonId }) => {
  return (
    <TouchableOpacity onPress={() => handleSelectedPokemon(pokemon.id)}>
      <Item
        center plain
        key={pokemon.id}
        style={pokemon.id === selectedPokemonId ? styles.pokemonContainerSelected : styles.pokemonContainer}
      >
        <Image source={{uri: pokemon.imageUri}} style={ styles.pokemonImage} />
      </Item>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  pokemonContainerSelected: {
    borderColor: Colors.blue,
    borderWidth: 3,
    borderRadius: 12,
    margin: 8,
    width: 52,
    height: 52
  },
  pokemonContainer: {
    borderColor: Colors.whiteGrey01,
    borderWidth: 3,
    borderRadius: 12,
    margin: 8,
    width: 52,
    height: 52
  },
  pokemonImage: {
    marginTop: 3,
    height: 40,
    width: 40
  },
  detailBox: {
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteGrey01
  },
  multipleContainerText: {
    borderRadius: 4,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: Colors.secondary,
    marginRight: 5
  }
})