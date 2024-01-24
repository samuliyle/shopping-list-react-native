import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react-native'
import {ThemeProvider} from '@rneui/themed'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react-native'
// override render method
export {customRender as render}
