import ProtectedRoutes from "@/components/protected";
import { AuthenticationContextProvider } from "@/context/authentication";
import PrivyProvider from "@/context/privy";

import type { Metadata } from "next";

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
            <body>{App({ children })}</body>
        </html>
    );
}

function App({ children }: iProps) {
    return (
        <PrivyProvider>
            <AuthenticationContextProvider>
                <ProtectedRoutes>
                    <>{children}</>
                </ProtectedRoutes>
            </AuthenticationContextProvider>
        </PrivyProvider>
    );
}
