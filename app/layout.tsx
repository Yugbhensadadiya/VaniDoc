import type { Metadata } from 'next'
import { Inter, Poppins, Noto_Sans_Gujarati } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({ subsets: ['latin'], variable: '--font-poppins', weight: ['500', '600', '700'] })
const gujarati = Noto_Sans_Gujarati({ subsets: ['gujarati'], variable: '--font-gujarati' })

export const metadata: Metadata = {
  title: 'VaaniDoc — Healthcare that speaks your language',
  description: 'AI-powered healthcare documentation for every voice, every language, every village.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-slate-50"><body className={`${inter.variable} ${poppins.variable} ${gujarati.variable}`}>{children}</body></html>
}
