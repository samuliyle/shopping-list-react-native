import productsJson from '../data/products.json'
import {useShoppingListStore} from '../store/shoppingListStore'

export const useSeedProducts = () => {
  const currentProducts = useShoppingListStore(state => state.products)
  const setProducts = useShoppingListStore(state => state.setProducts)
  if (currentProducts.length !== 0) {
    return
  }

  setProducts(productsJson)
}
