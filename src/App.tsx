import React, {useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ListScreen} from './screens/list-screen'
import {ListDetailsScreen} from './screens/list-details-screen'
import {RootStackParamList} from './types'
import {NewListScreen} from './screens/new-list-screen'
import {seedData} from './storage'
import {NewItemScreen} from './screens/new-item-screen'
import {ThemeProvider} from '@shopify/restyle'
import {theme, darkTheme} from './theme'
import {SafeAreaView, StyleSheet} from 'react-native'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  const [darkMode] = useState(false)

  const selectedTheme = darkMode ? darkTheme : theme

  seedData()

  return (
    <NavigationContainer>
      <ThemeProvider theme={selectedTheme}>
        <SafeAreaView style={styles.container}>
          <Stack.Navigator initialRouteName="Lists">
            <Stack.Screen name="Lists" component={ListScreen} />
            <Stack.Screen name="ListDetails" component={ListDetailsScreen} />
            <Stack.Screen name="NewList" component={NewListScreen} />
            <Stack.Screen name="NewItem" component={NewItemScreen} />
          </Stack.Navigator>
        </SafeAreaView>
      </ThemeProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
