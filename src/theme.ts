import {createTheme} from '@rneui/themed'

export const palette = {
  primary: '#86B6F6',
  secondary: '#176B87',
  lightBackground: '#F8F8F8',
  darkBackground: '#1C1C1D',
  listItemLightBackground: 'white',
  listItemDarkBackground: '#2C2C2D',
  success: '#33B623'
}

export const theme = createTheme({
  lightColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.lightBackground,
    success: palette.success
  },
  darkColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.darkBackground,
    success: palette.success
  },
  components: {
    ListItem: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.listItemLightBackground
      }
    }),
    ListItemSwipeable: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.listItemLightBackground
      }
    }),
    ListItemCheckBox: {
      uncheckedColor: palette.primary,
      checkedColor: palette.success
    },
    SearchBar: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.listItemLightBackground,
        borderTopWidth: 0,
        borderBottomWidth: 0
      },
      inputStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.lightBackground
      },
      inputContainerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItemDarkBackground
            : palette.lightBackground
      }
    })
  }
})
