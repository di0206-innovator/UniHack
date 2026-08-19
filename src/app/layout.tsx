import type { Metadata } from 'next';
import './globals.css';
import { ProductProvider } from '@/context/ProductContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Forge AI | Industrial Product Intelligence Platform',
  description: 'AI-powered product intelligence, spec extraction, evidence validation, and commerce readiness for industrial catalog data.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans transition-colors">
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <AppShell>{children}</AppShell>
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
