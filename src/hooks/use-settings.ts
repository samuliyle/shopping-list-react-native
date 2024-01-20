import {useMMKVObject} from 'react-native-mmkv'
import {Settings} from '../types'

const initialSettings: Settings = {
  theme: 'device'
}

export const useSettings = (): [
  settings: Settings,
  setSettings: (value: Settings | undefined) => void
] => {
  const [settings, setSettings] = useMMKVObject<Settings>('settings')
  return [settings ?? initialSettings, setSettings]
}
