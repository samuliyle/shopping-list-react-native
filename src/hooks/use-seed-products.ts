import productsJson from '../data/products.json'
import {useShoppingListStore} from '../store/shoppingListStore'

export const useSeedProducts = () => {
  console.log('seed products')
  const currentProducts = useShoppingListStore(state => state.products)
  const setProducts = useShoppingListStore(state => state.setProducts)
  if (currentProducts.length !== 0) {
    console.log('skip seeding products')
    return
  }

  setProducts(productsJson)
}
