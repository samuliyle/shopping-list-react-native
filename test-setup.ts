import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
require('react-native-reanimated').setUpTests()

jest.mock('react-native-vector-icons', () => 'Icons')
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
