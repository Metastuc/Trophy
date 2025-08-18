const layoutMap: Record<string, tStreamLayoutKey> = {
    "0-no-screen": "host-only",
    "0-screen": "host-only-with-screen",
    "1-no-screen": "host-with-one-co-host",
    "1-screen": "host-with-one-co-host-with-screen",
    "2-no-screen": "host-with-two-co-hosts",
    "2-screen": "host-with-two-co-hosts-with-screen",
    "3-no-screen": "host-with-three-co-hosts",
    "3-screen": "host-with-three-co-hosts-with-screen",
    "4-no-screen": "host-with-four-co-hosts",
    "4-screen": "host-with-four-co-hosts-with-screen",
};

interface iGetStreamLayoutKey {
    coHostCount: number;
    isScreenSharing: boolean;
}

export function getStreamLayoutKey({ coHostCount, isScreenSharing }: iGetStreamLayoutKey): tStreamLayoutKey {
    return layoutMap[`${coHostCount}-${isScreenSharing ? "screen" : "no-screen"}`] || "unsupported";
}
