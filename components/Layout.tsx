import { FC, ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  title: string
  children: ReactNode
}

// FCとはなんぞや
/*
constによる型定義でコンポーネントを定義できる型です。コンポーネントというのはReact独自のタグで、オリジナルのタグを作成し、タグの中で他のタグをまとめて定義できるもの 
*/

export const Layout: FC<Props> = ({ children, title = 'Next.js' }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>{title}</title>
      </Head>
      <main className="flex w-screen flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </div>
  )
}
