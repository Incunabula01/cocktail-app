import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Poiret_One } from 'next/font/google';
import Header from './components/header';
import { AuthProvider } from './context';

const montserrat = Montserrat({
  weight: ['100', '300', '600'],
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const poiretOne = Poiret_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poiret-one'
});

export const metadata: Metadata = {
  title: 'Cocktail App',
  description: 'Cocktail app using the cocktail app api',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poiretOne.variable} bg-cover bg-no-repeat relative`} style={{ backgroundImage: 'url("/bar-background.jpg")' }}>
        <AuthProvider >
          <Header />
          <div className="mt-[80px] relative z-40">
            <main className="container mx-auto items-center min-h-screen flex flex-col gap-3">
              {children}
            </main>
          </div>
        </AuthProvider>
        <div className="absolute -inset-[65px] bg-opacity-80 bg-rose-800 "></div>
      </body>
    </html>
  )
}
