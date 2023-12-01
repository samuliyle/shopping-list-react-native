import {MMKV} from 'react-native-mmkv'
import {Category, Product, ShoppingList} from '../types'
import {v4 as uuidv4} from 'uuid'
import productsJson from '../data/products.json'

export const storage = new MMKV()

export const seedData = () => {
  console.log('start seed data')
  const hasProducts = storage.contains('products')
  if (hasProducts) {
    console.log('skip seed data')
    //storage.delete('products')
    return
  }
  const products: Product[] = productsJson.map(p => ({
    name: p.item,
    category: p.category as Category,
    seeded: true
  }))
  storage.set('products', JSON.stringify(products))
  console.log('seeded data')
}

export const getLists = (): ShoppingList[] => {
  const serializedLists = storage.getString('lists')
  console.log(serializedLists)
  if (!serializedLists) {
    return []
  } else {
    return JSON.parse(serializedLists)
  }
}

export const addNewList = (name: string) => {
  const lists = getLists()
  lists.push({
    name: name,
    id: uuidv4()
  })
  storage.set('lists', JSON.stringify(lists))
}
