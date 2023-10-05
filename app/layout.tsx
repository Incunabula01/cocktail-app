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
      <body className={`${montserrat.variable} ${poiretOne.variable} bg-rose-800 relative lg:overflow-hidden`} >
        <AuthProvider >
          <Header />
          <div className="mt-[60px] relative z-40 px-2">
            <main className="container mx-auto  bg-cover bg-no-repeat rounded-lg" style={{ backgroundImage: 'url("/bar-background.jpg")', backgroundSize: 'cover' }}>
              <div className='flex flex-col items-center mx-auto gap-2 rounded-lg backdrop-blur p-4 md:min-h-[80vh]' style={{ backgroundColor: 'rgba(159,18,57, 0.4)'}}>
                {children}
              </div>
              
            </main>
          </div>
        </AuthProvider>
       
      </body>
    </html>
  )
}
