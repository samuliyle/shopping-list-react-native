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
        color: themeProps.colors.primary,
        fontFamily: 'NotoSans-SemiBold',
        fontWeight: '600'
      },
      h2Style: {
        fontFamily: 'NotoSans-SemiBold',
        fontWeight: '600'
      },
      h3Style: {
        fontFamily: 'NotoSans-SemiBold',
        fontWeight: '600'
      },
      h4Style: {
        fontFamily: 'NotoSans-SemiBold',
        fontWeight: '600'
      },
      h5Style: {
        fontFamily: 'NotoSans-SemiBold',
        fontWeight: '600'
      },
      style: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500'
      },
      selectable: true
    }),
    ListItemTitle: {
      style: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500'
      }
    },
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
            : palette.background.lightBackground,
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500'
      },
      inputContainerStyle: {
        backgroundColor:
          themeProps.mode === 'dark'
            ? palette.progressBar.darkBackground
            : palette.background.lightBackground
      }
    }),
    FAB: {
      upperCase: true,
      style: {
        marginBottom: 75
      },
      icon: {
        color: 'white'
      },
      titleStyle: {
        color: 'white',
        fontFamily: 'NotoSans-Bold',
        fontWeight: '700'
      }
    },
    Button: {
      uppercase: true,
      containerStyle: {
        borderRadius: 20
      },
      titleStyle: {
        fontFamily: 'NotoSans-Bold',
        fontWeight: '700'
      }
    },
    Input: (_, themeProps) => ({
      inputContainerStyle: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: themeProps.colors.primary,
        borderRadius: 10
      },
      containerStyle: {
        paddingLeft: 0,
        paddingRight: 0
      },
      inputStyle: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500'
      }
    }),
    CheckBox: {
      textStyle: {
        fontFamily: 'NotoSans-Medium',
        fontWeight: '500'
      }
    }
  }
})
