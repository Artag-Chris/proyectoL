import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "../components/components/theme-provider"
import { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'VibrantShop - Tu tienda en línea',
  description: 'Descubre productos increíbles en nuestra tienda vibrante y energética.',
  openGraph: {
    title: 'VibrantShop - Tu tienda en línea',
    description: 'Descubre productos increíbles en nuestra tienda vibrante y energética.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibrantShop - Tu tienda en línea',
    description: 'Descubre productos increíbles en nuestra tienda vibrante y energética.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

