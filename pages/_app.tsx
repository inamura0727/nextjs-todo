import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import axios from 'axios'

// retry:RestARIのfetchに失敗した際に、自動的に3回リトライする機能をfalseに変更
// refetchOnWindowFocus: ユーザーがブラウザにフォーカスを当てた際にRestAPIのfetchが走る機能をfalseに変更
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  // withCredentials:フロントエンドサイドとサーバーサイドでCookieのやりとりをする場合は、trueにしておく必要がある
  axios.defaults.withCredentials = true
  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`
      )
      //axiosのデフォルト設定で、ヘッダーに’csrf-token’という名前をつけて、トークンを設定する
      axios.defaults.headers.common['csrf-token'] = data.csrfToken
    }
    // getCsrfTokenの中でgetCsrToken関数を実行する
    getCsrfToken()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
