import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './src/screens/login/login'
import HomeScreen from './src/screens'
import RootNavigation from './src/Navigation/rootNavigation'
import { View } from 'react-native'
const Stack = createStackNavigator()
const App = () => {
  return (
   <View style={{flex:1}}>
    <RootNavigation/>
   </View>
  )
}

export default App
