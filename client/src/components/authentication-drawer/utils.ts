import { z } from "zod";

export function AuthenticationReducer(state: tAuthState, action: tAuthAction): tAuthState {
    switch (action.type) {
        case "BACK":
            const newStack = [...state.screenStack];
            newStack.pop();
            const previousScreen = newStack[newStack.length - 1] || "default";
            return {
                ...state,
                email: previousScreen === "otp" ? state.email : undefined,
                screenStack: newStack,
                type: previousScreen as tAuthState["type"],
            };

        case "GO_TO_DEFAULT":
            return {
                ...state,
                screenStack: [...state.screenStack, "default"],
                type: "default",
            };

        case "GO_TO_EMAIL":
            return {
                ...state,
                screenStack: [...state.screenStack, "email"],
                type: "email",
            };

        case "GO_TO_FARCASTER":
            return {
                ...state,
                screenStack: [...state.screenStack, "farcaster"],
                type: "farcaster",
            };

        case "GO_TO_FINISH":
            return {
                ...state,
                autheticationMethod: action.autheticationMethod,
                screenStack: [...state.screenStack, "finish"],
                type: "finish",
            };

        case "GO_TO_OTP":
            return {
                ...state,
                email: action.email,
                screenStack: [...state.screenStack, "otp"],
                type: "otp",
            };

        case "GO_TO_WALLET":
            return {
                ...state,
                screenStack: [...state.screenStack, "wallet"],
                type: "wallet",
            };

        default:
            return state;
    }
}

export const AuthenticationProfileSchema = z.object({
    bio: z.string().optional(),

    email: z.string().email("Invalid email address"),

    profileImage: z.union([
        z
            .instanceof(File)
            .refine((file) => file.size < 10 * 1024 * 1024, "File size must be less than 10MB")
            .refine(
                (file) => ["image/jpeg", "image/png"].includes(file.type),
                "Only JPEG and PNG formats are allowed",
            )
            .optional(),
        z.literal("default-pfp.svg"),
    ]),

    username: z.string().min(3, "Username must be at least 3 characters"),
});

export type tAuthenticationProfileSchema = z.infer<typeof AuthenticationProfileSchema>;
