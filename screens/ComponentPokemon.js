import React from "react"
import { StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from "react-native"
import { Item, Section, RenderIf } from "../components/index"
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

export const RenderTypeName = ({ name, isFilter }) => (
  <Item plain row style={styles.multipleContainerText}>
    <BodyRegular style={{ color: Colors.primary }}>{name.toUpperCase()}</BodyRegular>
    <RenderIf condition={isFilter}>
      <Item plain style={styles.containerXButton}>
        <BodyRegular style={styles.xButton}>X</BodyRegular>
      </Item>
    </RenderIf>
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
            <RenderTypeName key={data.slot} name={data.type.name} />
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

export const RenderListPokemon = ({ refreshing, pokemons, RenderItemPokemon, handleRefresh, handleLoadMore }) => {
  return (
    <Item small center borderRadius={12} backgroundColor={Colors.whiteGrey02} height={'63%'}>
      <RenderIf condition={!refreshing}>
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.id}
          renderItem={RenderItemPokemon}
          horizontal={false}
          numColumns={5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
        />
      </RenderIf>
      <RenderIf condition={refreshing}>
        <Item style={styles.containerActivtyIndicator}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </Item>
      </RenderIf>
    </Item>
  )
}

export const RenderContainerDetailPokemon = ({ selectedPokemon, loaderPokemonDetail }) => {
  return (
    <Item 
      small center height={'30%'}
      borderRadius={12}
      backgroundColor={Colors.whiteGrey02}
      style={styles.containerDetail}
    >
      <Section>
        <RenderIf condition={selectedPokemon}>
          <RenderIf condition={!loaderPokemonDetail}>
            <RenderDetailPokemon selectedPokemon={selectedPokemon} />
          </RenderIf>
          <RenderIf condition={loaderPokemonDetail}>
            <Item style={styles.containerActivtyIndicator}>
              <ActivityIndicator size="large" color={Colors.blue} />
            </Item>
          </RenderIf>
        </RenderIf>
        <RenderIf condition={!selectedPokemon}>
          <Image source={require('../assets/Pokeball.png')} style={styles.pokeballImage} />
        </RenderIf>
      </Section>
    </Item>
  )
}

const styles = StyleSheet.create({
  pokemonContainerSelected: {
    borderColor: Colors.blue,
    borderWidth: 3,
    borderRadius: 12,
    margin: 8
  },
  pokemonContainer: {
    borderColor: Colors.whiteGrey01,
    borderWidth: 3,
    borderRadius: 12,
    margin: 8
  },
  pokeballImage: {
    height: Dimensions.get('window').height / 5,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  pokemonImage: {
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
  },
  containerDetail: {
    marginTop: 10
  },
  containerActivtyIndicator: {
    marginTop: 40
  },
  containerXButton: {
    borderLeftWidth: 0.5,
    borderLeftColor: Colors.primary,
    marginLeft: 5
  },
  xButton: {
    color: Colors.primary,
    paddingLeft: 5
  }
})