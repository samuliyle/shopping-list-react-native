import React from 'react'
import {render, userEvent, waitFor} from '@testing-library/react-native'
import {NewItemScreen} from '../../screens/new-item-screen'
import {Product, ShoppingList} from '../../types'

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

jest.mock('../../store/shoppingListStore', () => ({
  useShoppingListStore: (passedFunction: any) => {
    const data = {
      shoppingLists: [
        {
          id: 1,
          name: 'test list',
          items: []
        }
      ] as ShoppingList[],
      products: mockProducts
    }

    return passedFunction(data)
  }
}))

const props = {route: {params: {listId: 1}}} as React.ComponentProps<
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

    await waitFor(() => {
      expect(getByText('test')).toBeDefined()
      expect(queryByText('not related')).toBeNull()
    })
  })
})
