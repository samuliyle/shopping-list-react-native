import {useMMKVObject} from 'react-native-mmkv'
import {Product} from '../types'

export const useProducts = (): [
  products: Product[],
  setProducts: (value: Product[] | undefined) => void
] => {
  const [products, setProducts] = useMMKVObject<Product[]>('products')
  return [products ?? [], setProducts]
}
