import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app'
import { GlobalProvider } from 'context/GlobalState'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}
