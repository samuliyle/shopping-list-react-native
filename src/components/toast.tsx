import React, {useRef, useContext, useEffect} from 'react'
import {
  Text,
  StyleSheet,
  Animated,
  Platform,
  UIManager,
  Easing,
  TouchableOpacity
} from 'react-native'
import {ToastContext} from '../contexts/toast-context'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export const Toast = () => {
  const {toast, hideToast} = useContext(ToastContext)
  const fadeAnimation = useRef(new Animated.Value(0))

  useEffect(() => {
    if (toast.visible) {
      Animated.timing(fadeAnimation.current, {
        duration: 500,
        easing: Easing.ease,
        toValue: 1,
        useNativeDriver: true
      }).start()
    } else {
      Animated.timing(fadeAnimation.current, {
        duration: 500,
        easing: Easing.ease,
        toValue: 0,
        useNativeDriver: true
      }).start()
    }
  }, [toast])

  return (
    <Animated.View style={[styles.toast, {opacity: fadeAnimation.current}]}>
      <TouchableOpacity onPress={hideToast} style={styles.content}>
        <Text style={styles.toastMessage}> {toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center'
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%'
  },
  toastMessage: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
    letterSpacing: 0.26,
    marginHorizontal: 10
  }
})
