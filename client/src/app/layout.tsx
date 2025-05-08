"use client"

import ProtectedRoutes from "@/components/protected";
import { AuthenticationContextProvider } from "@/context/authentication";
import PrivyProvider from "@/context/privy";
import { HuddleClient, HuddleProvider } from "@huddle01/react";
import type { Metadata } from "next";

import "./globals.css";

// Initialize HuddleClient
const huddleClient = new HuddleClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  options: {
    activeSpeakers: {
      size: 12,
    },
  },
});

// export const metadata: Metadata = {
//     title: "Trophy",
//     description: "onChain",
// };

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
                    <HuddleProvider client={huddleClient}>
                        {children}
                    </HuddleProvider>
                </ProtectedRoutes>
            </AuthenticationContextProvider>
        </PrivyProvider>
    );
}
