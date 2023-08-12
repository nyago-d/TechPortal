import './globals.css'
import { Noto_Sans_JP } from 'next/font/google'

export const metadata = {
  title: 'Tech Portal',
  description: 'Tech Portal',
}

const NotoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={NotoSansJP.className}>{children}</body>
    </html>
  )
}
