import React, {PropsWithChildren} from 'react'
import {ThemeSpacing, useTheme} from '@rneui/themed'
import {StyleProp, View, ViewStyle} from 'react-native'

type Props = {
  marginTop?: keyof ThemeSpacing
  marginBottom?: keyof ThemeSpacing
  padding?: keyof ThemeSpacing
  style?: StyleProp<ViewStyle>
}

export const Spacer = ({
  marginTop,
  marginBottom,
  padding,
  style,
  children
}: PropsWithChildren<Props>) => {
  const theme = useTheme()

  return (
    <View
      style={[
        {
          padding: padding ? theme.theme.spacing[padding] : undefined,
          marginTop: marginTop ? theme.theme.spacing[marginTop] : undefined,
          marginBottom: marginBottom
            ? theme.theme.spacing[marginBottom]
            : undefined
        },
        style
      ]}>
      {children}
    </View>
  )
}
