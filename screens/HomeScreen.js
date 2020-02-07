import React from "react"
import { StyleSheet } from "react-native"

import { RootComponent, Section, Item } from "../components/index"
import BodyBold from "../components/UI/BodyBold"

const HomeScreen = props => {
  return (
    <RootComponent>
      <Section>
        <Item center>
          <BodyBold>Lalapopo</BodyBold>
        </Item>
      </Section>
    </RootComponent>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default HomeScreen
