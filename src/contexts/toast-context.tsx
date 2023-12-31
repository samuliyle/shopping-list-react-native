import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

type ToastMessage = {
  message: string
  visible: boolean
}

const initialToast: ToastMessage = {
  message: '',
  visible: false
}

type ToastContextProps = {
  hideToast: () => void
  showToast: (message: string) => void
  toast: ToastMessage
}
export const ToastContext = createContext<ToastContextProps>({
  hideToast: () => undefined,
  showToast: () => undefined,
  toast: initialToast
})

export const ToastProvider = ({children}: PropsWithChildren) => {
  const [toast, setToast] = useState<ToastMessage>(initialToast)
  const timeout = useRef(0)

  const showToast = useCallback((message: string) => {
    setToast({visible: true, message: message})
  }, [])

  const hideToast = useCallback(() => {
    setToast({...toast, visible: false})
  }, [toast])

  // Autohide toast
  useEffect(() => {
    if (toast.visible) {
      timeout.current = setTimeout(hideToast, 1500)
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current)
        }
      }
    }
  }, [hideToast, toast])

  return (
    <ToastContext.Provider
      value={{
        hideToast,
        showToast,
        toast
      }}>
      {children}
    </ToastContext.Provider>
  )
}
