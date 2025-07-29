import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shedooby - Support for Shedooby iOS App',
  description: 'Official support and marketing site for the Shedooby iOS app, featuring blog posts and app tips.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#d7cdbc]">
        <AuthProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}