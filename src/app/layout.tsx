import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProviders } from './auth/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mesh',
  description: 'All-in-one remote work platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900`}>
        <AuthProviders>
          <div className="min-h-screen">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProviders>
      </body>
    </html>
  );
}
