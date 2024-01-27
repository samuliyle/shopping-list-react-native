import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {zustandStorage} from './mmkv'
import {AppTheme, ShoppingList, ShoppingListItem} from '../types'

type ShoppingListState = {
  /**
   * Selected app theme
   */
  theme: AppTheme
  /**
   * Flag whether to prevent the screen from going to sleep while the app is active
   */
  keepScreenOn: boolean
  /**
   * All shopping lists including their items
   */
  shoppingLists: ShoppingList[]
  /**
   * Initial seeded products and any new items added by user
   */
  products: string[]
}

type ShoppingListActions = {
  /**
   * Change app theme
   */
  changeTheme: (theme: AppTheme) => void
  /**
   * Toggle whether to keep screen on or not
   */
  toggleKeepScreenOn: () => void
  /**
   * Remove shopping list and all its items
   */
  removeShoppingList: (id: number) => void
  /**
   * Add new shopping list
   */
  addShoppingList: (name: string) => void
  /**
   * Add new item to shopping list and to products if it doesnt already exist there
   */
  addItem: (listId: number, itemName: string) => void
  /**
   * Delete item from shopping list
   */
  deleteItem: (listId: number, itemName: string) => void
  /**
   * Toggle item checked status
   */
  toggleItem: (listId: number, itemName: string) => void
  /**
   * Set all initial seede products
   */
  setProducts: (products: string[]) => void
}

export const useShoppingListStore = create<
  ShoppingListState & ShoppingListActions
>()(
  persist(
    immer(set => ({
      theme: 'device',
      keepScreenOn: false,
      shoppingLists: [],
      products: [],
      changeTheme: theme => set({theme}),
      toggleKeepScreenOn: () =>
        set(state => {
          state.keepScreenOn = !state.keepScreenOn
        }),
      removeShoppingList: id =>
        set(state => {
          const index = state.shoppingLists.findIndex(l => l.id === id)
          if (index !== -1) {
            state.shoppingLists.splice(index, 1)
          }
        }),
      addShoppingList: name => {
        set(state => {
          const newId =
            state.shoppingLists.reduce(
              (prev, current) => (prev > current.id ? prev : current.id),
              0
            ) + 1
          const newList: ShoppingList = {
            name,
            id: newId,
            items: []
          }
          state.shoppingLists.push(newList)
        })
      },
      addItem: (listId, itemName) =>
        set(state => {
          const item: ShoppingListItem = {
            name: itemName,
            checked: false
          }
          const list = state.shoppingLists.find(l => l.id === listId)
          if (list) {
            list.items.push(item)
          }
          const productExists = state.products.some(
            p => p.toLocaleLowerCase() === itemName.toLocaleLowerCase()
          )
          if (!productExists) {
            state.products.push(itemName)
          }
        }),
      deleteItem: (listId, itemName) =>
        set(state => {
          const list = state.shoppingLists.find(l => l.id === listId)
          if (list) {
            const itemIndex = list.items.findIndex(i => i.name === itemName)
            if (itemIndex !== -1) {
              list.items.splice(itemIndex, 1)
            }
          }
        }),
      toggleItem: (listId, itemName) =>
        set(state => {
          const list = state.shoppingLists.find(l => l.id === listId)
          if (list) {
            const item = list.items.find(i => i.name === itemName)
            if (item) {
              item.checked = !item.checked
            }
          }
        }),
      setProducts: products =>
        set(state => {
          state.products = products
        })
    })),
    {
      name: 'shopping-list-storage',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
