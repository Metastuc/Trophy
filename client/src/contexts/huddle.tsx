import { HuddleClient, HuddleProvider } from "@huddle01/react";
import React from "react";

import { ENV_SCHEMA } from "@/lib/constants";

export function HuddleContextProvider({ children }: { children: React.ReactNode }) {
    const huddleClient = new HuddleClient({
        projectId: ENV_SCHEMA.HUDDLE_PROJECT_ID,
    });
    return <HuddleProvider client={huddleClient}>{children}</HuddleProvider>;
}
