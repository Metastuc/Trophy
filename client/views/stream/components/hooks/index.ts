import { useCreatorTokenSetup } from "./creator-token-setup";
import { useStreamFormState } from "./form-state";

export function useStreamForm() {
    const streamFormState = useStreamFormState();
    const creatorTokenFlow = useCreatorTokenSetup({
        formState: streamFormState.formState,
        setFormState: streamFormState.setFormState,
    });

    return {
        ...streamFormState,
        ...creatorTokenFlow,
    };
}
