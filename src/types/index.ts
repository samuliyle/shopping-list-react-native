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
  items: ShoppingListItem[]
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
  name: string
  inCurrentList: boolean
  weigth?: SearchResultWeigth
}

export const appThemes = ['light', 'dark', 'device'] as const
export type AppTheme = (typeof appThemes)[number]
