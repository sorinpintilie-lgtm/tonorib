import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'TonoRib - Fresh Fish Marketplace',
  description: 'A modern digital fish marketplace for aquaculture producers, restaurants, distributors, and retail buyers. Buy fresh, sell with confidence.',
  keywords: 'fish, aquaculture, seafood, fresh fish, trout, sea bream, marketplace, restaurants, wholesale',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}