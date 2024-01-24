import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock'
require('@shopify/flash-list/jestSetup')

jest.mock('react-native-vector-icons', () => 'Icons')
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext)
