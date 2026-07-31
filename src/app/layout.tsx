import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingChatWidget } from '@/components/chat/FloatingChatWidget';
import { LeadFormModal } from '@/components/modals/LeadFormModal';
import { AppointmentModal } from '@/components/modals/AppointmentModal';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ancara Real Estate — Luxury Real Estate & AI Consultancy',
    template: '%s | Ancara Real Estate',
  },
  description:
    'Discover luxury properties worldwide with Ancara Real Estate. Powered by instant AI assistance, bespoke property matching, and automated VIP consultations.',
  keywords: [
    'Ancara Real Estate',
    'Luxury Real Estate',
    'Dubai Marina Villa',
    'Downtown Luxury Apartments',
    'Real Estate AI Consultancy',
    'Property Investment',
  ],
  authors: [{ name: 'Ancara Real Estate' }],
  creator: 'Ancara Real Estate',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ancararealestate.com',
    title: 'Ancara Real Estate — Luxury Real Estate & AI Consultancy',
    description:
      'Discover luxury properties worldwide with Ancara Real Estate. Powered by instant AI assistance and bespoke consultation.',
    siteName: 'Ancara Real Estate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ancara Real Estate — Luxury Real Estate & AI Consultancy',
    description: 'Find your luxury property instantly with AI-powered concierge services.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground`}>
        <Providers>
          <div className="min-h-screen flex flex-col relative selection:bg-[#D4AF37]/30 selection:text-foreground">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingChatWidget />
            <LeadFormModal />
            <AppointmentModal />
          </div>
        </Providers>
      </body>
    </html>
  );
}
