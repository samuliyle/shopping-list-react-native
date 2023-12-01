import {useMMKVObject} from 'react-native-mmkv'
import {ShoppingList} from '../types'

export const useCurrentList = (
  id: number
): [
  list: ShoppingList,
  setLists: (value: ShoppingList[] | undefined) => void
] => {
  const [lists, setLists] = useMMKVObject<ShoppingList[]>('lists')

  const list = lists?.find(l => l.id === id)
  if (!list) {
    throw new Error('')
  }

  return [list, setLists]
}
