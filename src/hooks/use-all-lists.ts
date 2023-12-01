import {useMMKVObject} from 'react-native-mmkv'
import {ShoppingList} from '../types'

export const useAllLists = (): [
  items: ShoppingList[],
  setItems: (value: ShoppingList[] | undefined) => void
] => {
  const [lists, setLists] = useMMKVObject<ShoppingList[]>('lists')
  return [lists ?? [], setLists]
}
