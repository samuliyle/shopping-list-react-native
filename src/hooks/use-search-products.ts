import {useShoppingListStore} from '../store/shoppingListStore'
import {
  ShoppingListItem,
  Product,
  SearchResult,
  SearchResultWeigth
} from '../types'

const calculateWeight = (
  product: Product,
  searchText: string
): SearchResultWeigth => {
  const {name} = product

  // Search text is longer than the product name, can't match
  if (searchText.length > name.length) {
    return SearchResultWeigth.NO_MATCH
  }

  // 1. CASE SENSITIVE EQUALS: Case-sensitive equality trumps all
  if (name === searchText) {
    return SearchResultWeigth.CASE_SENSITIVE_EQUALS
  }

  const lowerCaseName = name.toLocaleLowerCase()
  const lowerCaseSearchText = searchText.toLocaleLowerCase()

  // 2. EQUALS: Case-insensitive equality
  if (lowerCaseName === lowerCaseSearchText) {
    return SearchResultWeigth.EQUALS
  }

  // 3. STARTS WITH: If the item starts with the given value
  if (lowerCaseName.startsWith(lowerCaseSearchText)) {
    return SearchResultWeigth.STARTS_WITH
  }

  // 4. WORD STARTS WITH: If the item has multiple words, then if one of those words starts with the given value
  const anyWordStartsWith = lowerCaseName
    .split(' ')
    .some(word => word.startsWith(lowerCaseSearchText))
  if (anyWordStartsWith) {
    return SearchResultWeigth.WORD_STARTS_WITH
  }

  // 5. CONTAINS: If the item contains the given value
  if (lowerCaseName.includes(lowerCaseSearchText)) {
    return SearchResultWeigth.CONTAINS
  }

  return SearchResultWeigth.NO_MATCH
}

/**
 * Hook to search products by user input and sorted + filtered by relevance
 * and checks their checked status in current list
 */
export const useSearchProducts = (
  currentListItems: ShoppingListItem[],
  searchText: string
): SearchResult[] => {
  const products = useShoppingListStore(state => state.products)

  if (!searchText) {
    // No search text, just return all without calculating weigth
    return products.map(p => {
      const currentListMatch = currentListItems.find(l => l.name === p.name)
      return {
        ...p,
        checkedInCurrentList: currentListMatch?.checked,
        weigth: SearchResultWeigth.NO_MATCH
      }
    })
  }

  // Filter and sort products by weight
  const filteredProducts = products
    .map(p => {
      const weigth = calculateWeight(p, searchText)
      const currentListMatch =
        weigth !== SearchResultWeigth.NO_MATCH
          ? currentListItems.find(l => l.name === p.name)
          : undefined
      return {
        ...p,
        checkedInCurrentList: currentListMatch?.checked,
        weigth: calculateWeight(p, searchText)
      }
    })
    .filter(p => p.weigth !== SearchResultWeigth.NO_MATCH)
    .sort((a, b) => (a.weigth < b.weigth ? 1 : -1))

  return filteredProducts
}
