module.exports = {
  preset: 'react-native',
  setupFiles: ['./test-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@react-navigation|@rneui)/)'
  ]
}
