import {useMMKVObject} from 'react-native-mmkv'
import {ShoppingListItem} from '../types'

export const useListItems = (
  id: string
): [
  items: ShoppingListItem[],
  setItems: (value: ShoppingListItem[] | undefined) => void
] => {
  const [items, setItems] = useMMKVObject<ShoppingListItem[]>(`list-${id}`)

  return [items ?? [], setItems]
}
