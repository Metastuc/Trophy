import { HuddleClient, HuddleProvider } from "@huddle01/react";
import React from "react";

import { ENV_SCHEMA } from "@/lib/constants";

const huddleClient = new HuddleClient({
    projectId: ENV_SCHEMA.HUDDLE_PROJECT_ID,
    options: { activeSpeakers: { size: 5 } },
});

export function HuddleContextProvider({ children }: { children: React.ReactNode }) {
    return <HuddleProvider client={huddleClient}>{children}</HuddleProvider>;
}
