import {createTheme} from '@shopify/restyle'

const palette = {
  purple: '#5A31F4',
  lightPurple: '#7856f6',
  green: '#099C77',
  black: '#101010',
  white: '#FFF'
}

export const theme = createTheme({
  colors: {
    background: palette.white,
    cardPrimaryBackground: palette.purple,
    cardSecondaryBackground: palette.green,
    progressBarContainerBackground: palette.lightPurple,
    progressBarFilledPrimaryBackground: palette.green,
    progressBarFilledSecondaryBackground: palette.purple,
    title: palette.black,
    text: palette.white,
    listBorder: palette.black
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40
  },
  breakpoints: {
    phone: 0,
    tablet: 768
  },
  textVariants: {
    defaults: {
      color: 'text'
    },
    header: {
      fontSize: 48,
      fontWeight: 'bold',
      color: 'title'
    },
    body: {
      fontSize: 16
    }
  },
  buttonVariants: {
    primary: {
      backgroundColor: 'cardPrimaryBackground'
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground'
    }
  },
  cardVariants: {
    defaults: {
      padding: 'm',
      borderRadius: 10
    },
    primary: {
      backgroundColor: 'cardPrimaryBackground'
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground'
    }
  },
  listVariants: {
    defaults: {
      backgroundColor: 'cardPrimaryBackground'
    },
    primary: {
      backgroundColor: 'cardPrimaryBackground'
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground'
    }
  },
  progressBarContainerVariants: {
    defaults: {
      backgroundColor: 'progressBarContainerBackground'
    }
  },
  progressBarVariants: {
    defaults: {
      backgroundColor: 'progressBarFilledPrimaryBackground'
    }
  }
})

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    title: palette.white
  }
}

export type Theme = typeof theme
