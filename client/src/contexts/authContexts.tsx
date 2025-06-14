import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

import { ENV_SCHEMA } from "@/lib/constants";

export function PrivyContextProvider({ children }: { children: React.ReactNode }) {
    return <PrivyProvider appId={ENV_SCHEMA.PRIVY_APP_ID}>{children}</PrivyProvider>;
}

export function HuddleContextProvider({ children }: { children: React.ReactNode }) {
    const huddleClient = new HuddleClient({
        projectId: ENV_SCHEMA.HUDDLE_PROJECT_ID,
    });
    return <HuddleProvider client={huddleClient}>{children}</HuddleProvider>;
}
