import React from "react";

import { StreamingUIContext } from "./context";

export function useStreamingUIPermissions() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.permissions;
}

export function useStreamingUIRoles() {
    const context: iStreamingUIContext = React.useContext(StreamingUIContext);
    return context.roomRoles;
}
