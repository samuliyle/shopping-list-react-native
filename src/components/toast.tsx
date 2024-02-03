import React, {useRef, useContext, useEffect} from 'react'
import {
  Animated,
  Platform,
  UIManager,
  Easing,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {ToastContext} from '../contexts/toast-context'
import {Text} from '@rneui/themed'
import {palette} from '../theme'

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
      <TouchableOpacity onPress={hideToast} style={styles.toastContent}>
        <Text style={styles.toastMessage}>{toast.message}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    backgroundColor: palette.arsenic,
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center'
  },
  toastContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 32,
    width: '100%'
  },
  toastMessage: {
    marginHorizontal: 10,
    color: 'white'
  }
})
