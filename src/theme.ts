import {createTheme} from '@rneui/themed'

export const palette = {
  primary: '#ff7d4f',
  secondary: '#4FD1FF',
  success: '#33B623',
  arsenic: '#353535',
  background: {
    lightBackground: '#F8F8F8',
    darkBackground: '#1C1C1D'
  },
  listItem: {
    lightBackground: 'white',
    darkBackground: '#2C2C2D'
  },
  progressBar: {
    lightBackground: '#F8F8F8',
    darkBackground: '#353535'
  }
}

export const theme = createTheme({
  lightColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background.lightBackground,
    success: palette.success
  },
  darkColors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.background.darkBackground,
    success: palette.success
  },
  components: {
    Icon: {
      style: {
        color: 'pink'
      }
    },
    Text: (_, themeProps) => ({
      h1Style: {
        color: themeProps.colors.primary
      }
    }),
    ListItem: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItem.darkBackground
            : palette.listItem.lightBackground
      }
    }),
    ListItemSwipeable: (_, themeProps) => ({
      containerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.listItem.darkBackground
            : palette.listItem.lightBackground
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
            ? palette.listItem.darkBackground
            : palette.listItem.lightBackground,
        borderTopWidth: 0,
        borderBottomWidth: 0
      },
      inputStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.progressBar.darkBackground
            : palette.background.lightBackground
      },
      inputContainerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.progressBar.darkBackground
            : palette.background.lightBackground
      }
    }),
    FAB: {
      style: {
        marginBottom: 75
      },
      icon: {
        color: 'white'
      },
      titleStyle: {
        color: 'white'
      }
    }
  }
})
