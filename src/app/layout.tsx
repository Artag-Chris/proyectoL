'use client'
import './globals.css'
import { Poppins } from 'next/font/google'
import { ThemeProvider } from "../components/components/theme-provider";
import { SessionProvider } from 'next-auth/react';
import { FloatingLoginButton } from '@/components/components/loginreminder';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="light" style={{ colorScheme: 'light' }}>
      <body className={poppins.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <FloatingLoginButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
