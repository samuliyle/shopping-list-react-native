/**
 * Route params
 */
export type RootStackParamList = {
  Lists: undefined
  ListDetails: {id: number}
  NewList: undefined
  NewItem: {listId: number}
  Settings: undefined
}

export type ShoppingListItem = {
  name: string
  checked: boolean
}

export type ShoppingList = {
  name: string
  id: number
}

export type Category =
  | 'Dairy'
  | 'Bakery'
  | 'Meat'
  | 'Grains'
  | 'Produce'
  | 'Seafood'
  | 'Breakfast'
  | 'Beverages'
  | 'Baking'
  | 'Spices'
  | 'Condiments'
  | 'Household'
  | 'Personal Care'
  | 'Kitchen'
  | 'Electronics'
  | 'Home Improvement'
  | 'Home Decor'
  | 'Frozen'
  | 'Snacks'
  | 'Spreads'
  | 'Canned Goods'
  | 'Sauces'
  | 'Pasta'
  | 'Sweets'
  | 'Deli'
  | 'Pet Supplies'
  | 'Baby Care'
  | 'Health'
  | 'Outdoor'
  | 'Home Essentials'
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

export const appThemes = ['light', 'dark', 'device'] as const
type AppTheme = (typeof appThemes)[number]

export type Settings = {
  theme: AppTheme
}
