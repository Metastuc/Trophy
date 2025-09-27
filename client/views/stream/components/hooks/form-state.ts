import { useState } from "react";

export function useStreamFormState() {
    const [formState, setFormState] = useState<CreateStreamFormState>(() => ({
        creatorToken: undefined,
        creatorTokenEnabled: false,
        date: "",
        username: "",
        walletAddress: undefined,
    }));

    return { formState, setFormState };
}
