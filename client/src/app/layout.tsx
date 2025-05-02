import BottomNavigationBar from "@/components/bottom-navigation-bar";
import MobileOnly from "@/components/mobile-restrict";
import ProtectedRoutes from "@/components/protected";
import TopNavigationBar from "@/components/top-navigation-bar";
import { AuthenticationContextProvider } from "@/context/authentication";
import PrivyProvider from "@/context/privy";

import type { Metadata } from "next";
import React from "react";

import "./globals.css";

export const metadata: Metadata = {
    title: "Trophy",
    description: "onChain",
};

interface iProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: iProps) {
    return (
        <html lang="en">
            <body>
                <PrivyProvider>
                    <AuthenticationContextProvider>
                        <ProtectedRoutes>
                            <MobileOnly>{App({ children })}</MobileOnly>
                        </ProtectedRoutes>
                    </AuthenticationContextProvider>
                </PrivyProvider>
            </body>
        </html>
    );
}

function App({ children }: iProps) {
    return (
        <div className="relative min-h-screen">
            <TopNavigationBar />
            <main>{children}</main>
            <BottomNavigationBar />
        </div>
    );
}
