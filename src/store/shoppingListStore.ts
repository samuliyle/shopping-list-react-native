import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {immer} from 'zustand/middleware/immer'
import {zustandStorage} from './mmkv'
import {AppTheme, Product, ShoppingList, ShoppingListItem} from '../types'

type ShoppingListState = {
  theme: AppTheme
  shoppingLists: ShoppingList[]
  products: Product[]
}

type ShoppingListActions = {
  changeTheme: (theme: AppTheme) => void
  removeShoppingList: (id: number) => void
  addShoppingList: (name: string) => void
  addItem: (listId: number, itemName: string) => void
  deleteItem: (listId: number, item: ShoppingListItem) => void
  toggleItem: (listId: number, itemName: string) => void
  setProducts: (products: Product[]) => void
}

export const useShoppingListStore = create<
  ShoppingListState & ShoppingListActions
>()(
  persist(
    immer(set => ({
      theme: 'device',
      shoppingLists: [],
      products: [],
      changeTheme: (theme: AppTheme) => set({theme}),
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
        }),
      deleteItem: (listId, item) =>
        set(state => {
          const list = state.shoppingLists.find(l => l.id === listId)
          if (list) {
            const itemIndex = list.items.findIndex(i => i.name === item.name)
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
