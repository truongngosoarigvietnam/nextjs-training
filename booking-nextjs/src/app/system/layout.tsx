import Header from "@/Layouts/header";
import { LoadingProvider } from "@/components/contexts/Loading";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Login - bookingCare",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LoadingProvider>
                    <Header>
                        {children}
                    </Header>
                </LoadingProvider>
            </body>
        </html>
    );
}
