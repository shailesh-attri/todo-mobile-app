import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StackNavigationOptions } from '@react-navigation/stack'
import Login from './screens/login/login'
import Signup from './screens/signup/index'
import Home from './screens'
const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="Login" component={Login} ></Stack.Screen>
        <Stack.Screen name="Signup" component={Signup} ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
