import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  RendererProvider,
  SSRProvider,
  webLightTheme,
  Theme,
} from '@fluentui/react-components'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FluentProvider>
      <Component {...pageProps} />
    </FluentProvider>
  )
}
