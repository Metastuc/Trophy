import { CreatorProfileContext } from "./hook";

export default function Component({ isButton }: iStreamerProfile) {
    const contextValue: iCreatorProfileContext = {
        isButton, // TODO: remove?
    };

    return (
        <CreatorProfileContext.Provider value={contextValue}>
            {isButton ? <RenderModal /> : <RenderUser />}
        </CreatorProfileContext.Provider>
    );
}

function RenderUser() {
    return <aside></aside>;
}

function RenderModal() {
    return <></>;
}
