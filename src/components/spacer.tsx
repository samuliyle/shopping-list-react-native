import React, {PropsWithChildren} from 'react'
import {ThemeSpacing, useTheme} from '@rneui/themed'
import {StyleProp, View, ViewStyle} from 'react-native'

type Props = {
  marginTop?: keyof ThemeSpacing
  marginBottom?: keyof ThemeSpacing
  marginLeft?: keyof ThemeSpacing
  marginRight?: keyof ThemeSpacing
  padding?: keyof ThemeSpacing
  margin?: keyof ThemeSpacing
  style?: StyleProp<ViewStyle>
}

export const Spacer = ({
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
  margin,
  style,
  children
}: PropsWithChildren<Props>) => {
  const theme = useTheme()

  return (
    <View
      style={[
        {
          margin: margin ? theme.theme.spacing[margin] : undefined,
          padding: padding ? theme.theme.spacing[padding] : undefined,
          marginTop: marginTop ? theme.theme.spacing[marginTop] : undefined,
          marginLeft: marginLeft ? theme.theme.spacing[marginLeft] : undefined,
          marginRight: marginRight
            ? theme.theme.spacing[marginRight]
            : undefined,
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
