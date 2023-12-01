import {MMKV} from 'react-native-mmkv'
import {Category, Product} from '../types'
import productsJson from '../data/products.json'

export const storage = new MMKV()

export const seedData = () => {
  //storage.clearAll()

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
