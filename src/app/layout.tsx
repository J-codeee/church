import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'United with Christ through the Holy Spirit Church',
  description: 'A vibrant community of believers dedicated to spreading God\'s love and building lasting relationships centered on faith, hope, and love.',
  keywords: ['church', 'community', 'faith', 'worship', 'spiritual growth'],
  authors: [{ name: 'United with Christ through the Holy Spirit Church' }],
  creator: 'United with Christ through the Holy Spirit Church',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: 'United with Christ through the Holy Spirit Church',
    description: 'A vibrant community of believers dedicated to spreading God\'s love and building lasting relationships centered on faith, hope, and love.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'United with Christ through the Holy Spirit Church',
    description: 'A vibrant community of believers dedicated to spreading God\'s love and building lasting relationships centered on faith, hope, and love.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased scroll-smooth`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}