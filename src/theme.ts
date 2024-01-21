import {createTheme} from '@rneui/themed'

const palette = {
  primary: '#86B6F6',
  secondary: '#176B87',
  lightBackground: '#F8F8F8',
  darkBackground: '#1C1C1D',
  listItemLightBackground: 'white',
  listItemDarkBackground: '#2C2C2D'
}

export const theme = createTheme({
  lightColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.lightBackground
  },
  darkColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.darkBackground
  },
  components: {
    Button: {
      raised: true
    },
    ListItemSwipeable: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.listItemLightBackground
      }
    })
  }
})
