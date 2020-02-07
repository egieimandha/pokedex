import React, { useEffect, useState } from "react"
import { StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { RootComponent, Section, Item, RenderIf } from "../components/index"
import BodyBold from "../components/UI/BodyBold"
import Colors from '../constants/colors'
import {
  RenderPokemon,
  RenderTypeName,
  RenderListPokemon,
  RenderContainerDetailPokemon
} from './ComponentPokemon'
import {
  fetchAllPokemon,
  fetchOnePokemon,
  fetchAllPokemonType,
  fetchAllPokemonWithType
} from '../services/pokemon'
import { transformPokemonWithImage } from '../transform/pokemon'
import Modal from 'react-native-modal'

const HomeScreen = props => {
  const [pokemons, setPokemon] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [nextFetch, setNextFetch] = useState('')
  const [selectedPokemonId, setSelectedPokemonId] = useState()
  const [selectedPokemon, setSelectedPokemon] = useState()
  const [loaderPokemonDetail, setLoaderPokemonDetail] = useState(false)
  const [visibleModalFilter, setVisibleModalFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(false)
  const [pokemonType, setPokemonType] = useState([])

  useEffect(() => {
    setRefreshing(true)
    getAllPokemon(null)
    getAllPokemonType()
  },[])

  useEffect(() => {
    setLoaderPokemonDetail(false)
  },[selectedPokemon])

  useEffect(() => {
    setRefreshing(false)
  },[pokemons])

  useEffect(() => {
    setSelectedPokemonId()
    setSelectedPokemon()
    setRefreshing(true)
    if (selectedFilter) getAllPokemonWithType()
    else getAllPokemon(null)
  },[selectedFilter])

  const getAllPokemon = (next) => {
    setTimeout(() => {
      fetchAllPokemon(next, 50)
        .then(data => {
          setNextFetch(data.next)
          let tempPokemons = transformPokemonWithImage(data.results)
          setPokemon(next ? [ ...pokemons, ...tempPokemons ] : tempPokemons)
        })
        .catch((error) => {
          setRefreshing(false)
        })
    }, 800)
  }

  const getAllPokemonType= () => {
    fetchAllPokemonType()
      .then(data => {
        setPokemonType(data.results)
      })
  }

  const getAllPokemonWithType= () => {
    fetchAllPokemonWithType(selectedFilter.name)
      .then(data => {
        let tempPokemons = transformPokemonWithImage(data.pokemon, true)
        setPokemon(tempPokemons)
      })
      .catch((error) => {
        setRefreshing(false)
      })
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setSelectedPokemonId()
    setSelectedPokemon()
    getAllPokemon(null)
  }

  const handleLoadMore = () => {
    if (!selectedFilter) getAllPokemon(nextFetch)
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

  const handleFilter = (type) => {
    setVisibleModalFilter(false)
    setSelectedFilter(type)
  }

  const RenderItemPokemon = ({ item }) => {
    return <RenderPokemon
      pokemon={item}
      handleSelectedPokemon={handleSelectedPokemon}
      selectedPokemonId={selectedPokemonId}
    />
  }

  const RenderItemType = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleFilter(item)}>
        <Item center small>
          <RenderTypeName name={item.name} />
        </Item>
      </TouchableOpacity>
    )
  }
  
  return (
    <RootComponent>
      <Section style={{ backgroundColor: 'red' }}>
        <RenderIf condition={selectedFilter}>
          <Item plain style={styles.filterItem}>
            <TouchableOpacity onPress={() => setSelectedFilter()}>
              <RenderTypeName name={selectedFilter && selectedFilter.name} isFilter />
            </TouchableOpacity>
          </Item>
        </RenderIf>
        <Item small center>
          <BodyBold style={{ color: Colors.primary, fontSize: 28 }}>
            Pokédex
          </BodyBold>
        </Item>
        <Item plain style={styles.filterButton}>
          <TouchableOpacity onPress={() => setVisibleModalFilter(true)}>
            <Item center>
              <BodyBold>
                Filter
              </BodyBold>
            </Item>
          </TouchableOpacity>
        </Item>
      </Section>
      <Section style={{ backgroundColor: 'red' }}>
        <RenderListPokemon
          refreshing={refreshing}
          pokemons={pokemons}
          RenderItemPokemon={RenderItemPokemon}
          handleRefresh={handleRefresh}
          handleLoadMore={handleLoadMore}
        />
        <RenderContainerDetailPokemon
          selectedPokemon={selectedPokemon}
          loaderPokemonDetail={loaderPokemonDetail}
        />
      </Section>
      <Modal isVisible={visibleModalFilter} containerStyle={styles.containerModal}>
        <Item center backgroundColor={Colors.primary} style={styles.containerModal}>
          <Item plain style={styles.titleModal}>
            <BodyBold>
              Please choose one of type Pokémon
            </BodyBold>
          </Item>
          <FlatList
            data={pokemonType}
            keyExtractor={(item) => item.name}
            renderItem={RenderItemType}
            horizontal={false}
            numColumns={4}
          />
        </Item>
      </Modal>
    </RootComponent>
  )
}

const styles = StyleSheet.create({
  filterItem: {                                  
    position: 'absolute',                                          
    top: 45,                                                    
    left: 20, 
  },
  filterButton: {
    width: '20%',     
    borderRadius: 20,            
    backgroundColor: Colors.whiteGrey02,                                    
    position: 'absolute',                                          
    top: 20,                                                    
    right: 20, 
  },
  containerModal: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  containerModal: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12
  },
  titleModal: {
    marginBottom:10,
    paddingBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary
  }
})

export default HomeScreen
