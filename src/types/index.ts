/**
 * Route params
 */
export type RootStackParamList = {
  Lists: undefined
  ListDetails: {id: string}
  NewList: undefined
  NewItem: {listId: string}
}

export type ShoppingListItem = {
  name: string
  checked: boolean
}

export type ShoppingList = {
  name: string
  /**
   * UUID
   */
  id: string
}

export type Category =
  | 'Fruits'
  | 'Dairy'
  | 'Bakery'
  | 'Vegetables'
  | 'Meat'
  | 'Grains'
  | 'Breakfast'
  | 'Beverages'
  | 'Baking'
  | 'Cooking'
  | 'Canned Goods'
  | 'Frozen Foods'
  | 'Snacks'
  | 'Other'

export type Product = {
  name: string
  category: Category
  seeded: boolean
}

export enum SearchResultWeigth {
  CASE_SENSITIVE_EQUALS = 5,
  EQUALS = 4,
  STARTS_WITH = 3,
  WORD_STARTS_WITH = 2,
  CONTAINS = 1,
  NO_MATCH = 0
}

export type SearchResult = {
  checkedInCurrentList: boolean | undefined
  weigth: SearchResultWeigth
} & Product
