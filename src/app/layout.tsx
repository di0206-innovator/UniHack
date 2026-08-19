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
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
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
