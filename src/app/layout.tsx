import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home Circle Realty | Luxury Real Estate & Advisory Bangalore',
  description: 'Curating Bengaluru’s finest luxury villas, villaments, sky penthouses, and gated communities. Exclusive advisory, 0% brokerage on builder units, and verified RERA properties.',
  keywords: 'Home Circle Realty, Bangalore luxury villas, Yelahanka villas, IVC Road villas, Whitefield penthouses, Rsquare reality alternative, real estate advisory Bangalore',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FAF9F6] text-gray-900 antialiased selection:bg-gold-500 selection:text-navy-950">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
