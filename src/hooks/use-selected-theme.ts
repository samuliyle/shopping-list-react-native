import {useColorScheme} from 'react-native'
import {useShoppingListStore} from '../store/shoppingListStore'

export const useSelectedTheme = () => {
  // Selected theme in app settings
  const userSelectedTheme = useShoppingListStore(state => state.theme)
  console.log('theme', userSelectedTheme)
  // User's preferred color scheme in phone settings
  const deviceTheme = useColorScheme()
  const selectedTheme =
    userSelectedTheme === 'device' ? deviceTheme : userSelectedTheme
  return selectedTheme ?? 'light'
}
