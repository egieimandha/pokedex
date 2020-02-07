import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { RootComponent, Section, Item, RenderIf } from "../components/index"
import BodyBold from "../components/UI/BodyBold"
import Colors from '../constants/colors'
import { RenderDetailPokemon, RenderPokemon } from './ComponentPokemon'
import { fetchAllPokemon, fetchOnePokemon } from '../services/pokemon'
import { transformPokemonWithImage } from '../transform/pokemon'

const HomeScreen = props => {
  const [pokemons, setPokemon] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [nextFetch, setNextFetch] = useState('')
  const [selectedPokemonId, setSelectedPokemonId] = useState()
  const [selectedPokemon, setSelectedPokemon] = useState()
  const [loaderPokemonDetail, setLoaderPokemonDetail] = useState(false)

  useEffect(() => {
    getAllPokemon(null)
  },[])

  useEffect(() => {
    setLoaderPokemonDetail(false)
  },[selectedPokemon])

  const getAllPokemon = (next) => {
    setTimeout(() => {
      fetchAllPokemon(next, 50)
        .then(data => {
          let tempPokemons = transformPokemonWithImage(data.results)
          setPokemon(next ? [ ...pokemons, ...tempPokemons ] : tempPokemons)
          setNextFetch(data.next)
          setRefreshing(false)
        })
        .catch((error) => {
          setRefreshing(false)
        })
    }, 1000)
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setSelectedPokemonId()
    setSelectedPokemon()
    getAllPokemon(null)
  }

  const handleLoadMore = () => {
    getAllPokemon(nextFetch)
  }

  const handleSelectedPokemon = (pokemonId) => {
    setTimeout(() => {
      setSelectedPokemonId(pokemonId)
      setLoaderPokemonDetail(true)
    }, 0)
    setTimeout(() => {
      fetchOnePokemon(pokemonId)
        .then(data => {
          setSelectedPokemon(data) 
        })
        .catch((error) => {
          setLoaderPokemonDetail(false)
        })
    }, 100)
  }

  const renderItem = ({ item }) => {
    return <RenderPokemon
      pokemon={item}
      handleSelectedPokemon={handleSelectedPokemon}
      selectedPokemonId={selectedPokemonId}
    />
  }
  
  return (
    <RootComponent>
      <Section style={{ backgroundColor: 'red' }}>
        <Item small center>
          <BodyBold style={{ color: Colors.primary }}>Pokédex</BodyBold>
        </Item>
      </Section>
      <Section>
        <Item small center height={'60%'}>
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal={false}
            numColumns={5}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
          />
        </Item>
        <Item small center height={'40%'}>
          <BodyBold>Pokémon Detail</BodyBold>
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
        </Item>
      </Section>
    </RootComponent>
  )
}

const styles = StyleSheet.create({
  containerActivtyIndicator: {
    marginTop: 40
  }
})

export default HomeScreen
