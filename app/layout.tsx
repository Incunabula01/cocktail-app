import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Poiret_One } from 'next/font/google';

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
      <body className={`${montserrat.variable} ${poiretOne.variable} bg-rose-800`}>{children}</body>
    </html>
  )
}
