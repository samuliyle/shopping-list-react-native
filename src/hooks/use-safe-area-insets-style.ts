import {useSafeAreaInsets} from 'react-native-safe-area-context'

export const useSafeAreaInsetsStyle = () => {
  const insets = useSafeAreaInsets()

  return {
    // paddingTop: insets.top, // react-navigation navigationBarColor seems to break this so disable for now: https://github.com/react-navigation/react-navigation/issues/11139
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right
  }
}
