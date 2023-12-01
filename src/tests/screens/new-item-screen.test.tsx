import React from 'react'
import {render, userEvent} from '../../../test-utils'
import NewItemScreen from '../../screens/new-item-screen'
import {Product} from '../../types'

const mockProducts: Product[] = [
  {
    name: 'test',
    category: 'Other',
    seeded: true
  },
  {
    name: 'not related',
    category: 'Other',
    seeded: true
  }
]

jest.mock('react-native-mmkv', () => {
  const actual = jest.requireActual('react-native-mmkv')
  return {
    __esModule: true,
    ...actual,
    useMMKVObject: jest.fn(() => [mockProducts, jest.fn()])
  }
})

const props = {route: {params: {}}} as React.ComponentProps<
  typeof NewItemScreen
>

describe('NewItemScreen', () => {
  test('renders all search results without search text', () => {
    const {getByPlaceholderText, getByText} = render(
      <NewItemScreen {...props} />
    )

    expect(getByPlaceholderText('Add new item')).toBeDefined()
    expect(getByText('test')).toBeDefined()
    expect(getByText('not related')).toBeDefined()
  })

  test('renders filtered search results', async () => {
    const {findByPlaceholderText, getByText, queryByText} = render(
      <NewItemScreen {...props} />
    )
    const user = userEvent.setup()

    const searchInput = await findByPlaceholderText('Add new item')
    await user.type(searchInput, 'test')

    expect(getByText('test')).toBeDefined()
    expect(queryByText('not related')).toBeNull()
  })
})
