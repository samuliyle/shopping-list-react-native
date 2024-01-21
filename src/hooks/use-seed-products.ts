import productsJson from '../data/products.json'
import {useShoppingListStore} from '../store/shoppingListStore'
import {Category, Product} from '../types'

export const useSeedProducts = () => {
  const currentProducts = useShoppingListStore(state => state.products)
  const setProducts = useShoppingListStore(state => state.setProducts)
  if (currentProducts.length !== 0) {
    return
  }

  const products: Product[] = productsJson.map(p => ({
    name: p.item,
    category: p.category as Category,
    seeded: true
  }))
  setProducts(products)
}
