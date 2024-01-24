import {useShoppingListStore} from '../store/shoppingListStore'

const removeDuplicates = (items: string[]) => {
  const uniqueItems: string[] = []
  items.forEach(i => {
    const hasItem = uniqueItems.some(
      u => u.toLocaleLowerCase().trim() === i.toLocaleLowerCase().trim()
    )
    if (!hasItem) {
      uniqueItems.push(i)
    }
  })
  return uniqueItems
}

export const useAllProducts = () => {
  const seededProducts = useShoppingListStore(state => state.products)
  const lists = useShoppingListStore(state => state.shoppingLists)

  const allUserItems = lists.flatMap(l => l.items).map(i => i.name)
  const allItems = allUserItems.concat(seededProducts)

  return removeDuplicates(allItems)
}
