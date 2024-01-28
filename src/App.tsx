import React, {useEffect} from 'react'
import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {
  NativeStackScreenProps,
  createNativeStackNavigator
} from '@react-navigation/native-stack'
import {ListScreen} from './screens/list-screen'
import {ListDetailsScreen} from './screens/list-details-screen'
import {RootStackParamList} from './types'
import {NewListScreen} from './screens/new-list-screen'
import {NewItemScreen} from './screens/new-item-screen'
import {StatusBar, TouchableOpacity, View} from 'react-native'
import {ToastProvider} from './contexts/toast-context'
import {Toast} from './components/toast'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Icon, ThemeProvider, makeStyles, useTheme} from '@rneui/themed'
import {theme} from './theme'
import {SettingsScreen} from './screens/settings-screen'
import {useSelectedTheme} from './hooks/use-selected-theme'
import {useSeedProducts} from './hooks/use-seed-products'
import {useShoppingListStore} from './store/shoppingListStore'
import {
  activateKeepAwake,
  deactivateKeepAwake
} from '@sayem314/react-native-keep-awake'

const Stack = createNativeStackNavigator<RootStackParamList>()

const listScreenOptions = ({
  navigation
}: NativeStackScreenProps<RootStackParamList, 'Lists'>) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.push('Settings')}>
      <Icon name="settings" />
    </TouchableOpacity>
  )
})

const Navigation = () => {
  const styles = useStyles()
  const {theme: rneuiTheme} = useTheme()
  const keepScreenOn = useShoppingListStore(state => state.keepScreenOn)

  useEffect(() => {
    if (keepScreenOn) {
      console.log('keep screen awake')
      activateKeepAwake()
    } else {
      console.log('dont keep screen awake')
      deactivateKeepAwake()
    }
  })

  return (
    <>
      <StatusBar
        backgroundColor={rneuiTheme.colors.background}
        barStyle={rneuiTheme.mode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <NavigationContainer
          theme={{
            colors: {
              primary: rneuiTheme.colors.primary,
              background: rneuiTheme.colors.background,
              card: rneuiTheme.colors.white,
              text: rneuiTheme.colors.black,
              border: DefaultTheme.colors.border,
              notification: DefaultTheme.colors.notification
            },
            dark: rneuiTheme.mode === 'dark'
          }}>
          <ToastProvider>
            <Stack.Navigator
              initialRouteName="Lists"
              screenOptions={{
                headerStyle: {
                  backgroundColor: rneuiTheme.colors.background
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                orientation: 'portrait'
              }}>
              <Stack.Screen
                name="Lists"
                component={ListScreen}
                options={listScreenOptions}
              />
              <Stack.Screen name="ListDetails" component={ListDetailsScreen} />
              <Stack.Screen name="NewList" component={NewListScreen} />
              <Stack.Screen name="NewItem" component={NewItemScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
            <Toast />
          </ToastProvider>
        </NavigationContainer>
      </View>
    </>
  )
}

const AppTheme = () => {
  theme.mode = useSelectedTheme()

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

const App = () => {
  useSeedProducts()

  return <AppTheme />
}

const useStyles = makeStyles(themeProps => ({
  container: {
    flexGrow: 1,
    backgroundColor: themeProps.colors.background
  }
}))

export default App
