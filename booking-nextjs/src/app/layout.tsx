import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import TanstackProvider from '@/components/common/tanstackQuery/TanstackProvider';
import { AuthProvider } from '@/components/common/Providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'BookingCare',
    description: 'Generated by create next app',
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['nextjs', 'nextjs13', 'next13', 'pwa', 'next-pwa'],
    icons: [
        { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
        { rel: 'icon', url: 'icons/icon-128x128.png' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <TanstackProvider>{children}</TanstackProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
