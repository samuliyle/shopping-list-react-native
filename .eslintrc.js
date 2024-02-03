module.exports = {
  root: true,
  extends: ['eslint:recommended', '@react-native', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-native',
            importNames: ['SafeAreaView'],
            message:
              'Use useSafeAreaInsets hook from react-native-safe-area-context instead of SafeAreaView component'
          },
          {
            name: 'react-native-safe-area-context',
            importNames: ['SafeAreaView'],
            message:
              'Use useSafeAreaInsets hook from react-native-safe-area-context instead of SafeAreaView component'
          },
          {
            name: 'react-native-safe-area-view',
            importNames: ['SafeAreaView'],
            message:
              'Use useSafeAreaInsets hook from react-native-safe-area-context instead of SafeAreaView component'
          },
          {
            name: 'react-native',
            importNames: ['Text', 'Button'],
            message: 'Use @rneui/themed components instead'
          }
        ]
      }
    ]
  }
}
