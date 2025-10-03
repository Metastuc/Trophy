import { useCreatorTokenSetup } from "./creator-token-setup";
import { useStreamFormState } from "./form-state";

export function useStreamForm(mutate: (data: CreateStreamFormRequest) => void) {
    const streamFormState = useStreamFormState();
    const creatorTokenFlow = useCreatorTokenSetup({
        formState: streamFormState.formState,
        setFormState: streamFormState.setFormState,
        mutate,
    });

    return {
        ...streamFormState,
        ...creatorTokenFlow,
    };
}
