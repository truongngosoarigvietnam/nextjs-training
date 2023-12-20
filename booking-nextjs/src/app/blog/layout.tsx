import HeaderBreadcrumb from '@/Layouts/HeaderBreadcrumb';
import { LoadingProvider } from '@/components/contexts/Loading';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'HandBook - bookingCare',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <HeaderBreadcrumb />
                <LoadingProvider>{children}</LoadingProvider>
            </body>
        </html>
    );
}
