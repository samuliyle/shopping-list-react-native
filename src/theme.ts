import {createTheme} from '@rneui/themed'

const palette = {
  purple: '#5A31F4',
  lightPurple: '#7856f6'
}

export const theme = createTheme({
  lightColors: {
    primary: palette.purple,
    secondary: palette.lightPurple
  },
  darkColors: {
    primary: palette.purple,
    secondary: palette.lightPurple
  },
  components: {
    Button: {
      raised: true
    }
  }
})
