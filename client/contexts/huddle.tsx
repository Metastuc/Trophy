import { HuddleClient, HuddleProvider } from "@huddle01/react";
import { ReactNode } from "react";

import { CLIENT_ENV } from "@/lib/constants";

const huddleClient = new HuddleClient({
    projectId: CLIENT_ENV.VITE_HUDDLE_PROJECT_ID,
    options: { activeSpeakers: { size: 5 } },
});

export function HuddleContextProvider({ children }: { children: ReactNode }) {
    return <HuddleProvider client={huddleClient}>{children}</HuddleProvider>;
}
