import { ReactNode } from 'react'
import { Metadata } from 'next'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import '@styles/global.scss'

import localFont from 'next/font/local'
import { Provider } from '@service/provider'

const font = localFont({
  src: [
    {
      path: './fonts/roboto-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/roboto-medium.woff2',
      weight: '500',
      style: 'normal'
    },
    {
      path: './fonts/roboto-bold.woff2',
      weight: '700',
      style: 'normal'
    }
  ]
})

export const metadata: Metadata = {
  icons: `${process.env.NODE_ENV === 'production' ? '/Project-LetsGo' : ''}/favicon.ico`
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" data-lt-installed="true">
      <body className={font.className}>
        <Provider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>

          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}
