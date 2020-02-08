// This the root component and it handle status bar and nodg. So your main screen appear in safe area
import React from "react"
import { View, StatusBar } from "react-native"
import SafeAreaView from "react-native-safe-area-view"
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Colors from "../constants/colors"

const RootComponent = props => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1,backgroundColor:'red' }} forceInset={{ top: 'always' }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.primary}
        />
        {props.children}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default RootComponent
