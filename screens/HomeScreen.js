import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList, Image, TouchableOpacity } from "react-native"
import { RootComponent, Section, Item } from "../components/index"
import BodyBold from "../components/UI/BodyBold"
import BodyRegular from "../components/UI/BodyRegular"
import { fetchAllPokemon } from '../services/pokemon'
import { transformPokemonWithImage } from '../transform/pokemon'
import Colors from '../constants/colors'

const HomeScreen = props => {
  const [pokemons, setPokemon] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [nextFetch, setNextFetch] = useState('')
  const [selectedPokemon, setSelectedPokemon] = useState()
  useEffect(() => {
    getAllPokemon(null)
  },[])

  const getAllPokemon = (next) => {
    fetchAllPokemon(next, 50)
      .then(data => {
        let tempPokemons = transformPokemonWithImage(data.results)
        setPokemon(next ? { ...pokemons, tempPokemons } : tempPokemons)
        setNextFetch(data.next)
        setRefreshing(false)
      })
      .catch((error) => {
        setRefreshing(false)
      })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getAllPokemon(next)
  }

  const RenderPokemon = ({ pokemon }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedPokemon(pokemon.id)}>
        <Item
          center plain
          key={pokemon.id}
          style={pokemon.id === selectedPokemon ? styles.pokemonContainerSelected : styles.pokemonContainer}
        >
          <Image source={{uri: pokemon.imageUri}} style={ styles.pokemonImage} />
        </Item>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }) => {
    return <RenderPokemon pokemon={item} />
  }
  
  return (
    <RootComponent>
      <Section>
        <Item center>
          <BodyBold>Lalapopo</BodyBold>
        </Item>
      </Section>
      <Section>
        <Item center>
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={false}
            numColumns={5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </Item>
      </Section>
    </RootComponent>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
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
  }
})

export default HomeScreen
