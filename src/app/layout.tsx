import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'PropertyLens — Know the property before you commit',
  description: 'AI Property Intelligence & Location Decision Platform for Chennai, India. Evaluate flood risk, commute time, water security, schools, hospitals, and infrastructure.',
  keywords: 'Chennai real estate, property decision score, Velachery flood risk, OMR commute time, Chennai metro proximity, PropertyLens',
  authors: [{ name: 'PropertyLens Engineering' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
