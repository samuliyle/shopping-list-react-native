import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react-native'

const AllTheProviders = ({children}: {children: React.ReactNode}) => {
  return children
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react-native'
export {customRender as render}
