interface iStreamerProfile {
    isButton: boolean;
}

interface iCreatorProfileContext {
    isButton: boolean; // TODO: remove?
    setIsOpen?: (open: boolean) => void;
    isOpen?: boolean;
}
