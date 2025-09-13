import { cn } from "@/lib/utils";

interface LiveStreamProfileProps {
    imgSrc?: string;
    username: string;
    isInvitation?: boolean;
    styles?: Record<string, string>;
}

export function LiveStreamProfile({ imgSrc, username, isInvitation = false, styles }: LiveStreamProfileProps) {
    return (
        <div className={cn("inline-flex items-center justify-center gap-0.5", styles?.container)}>
            {imgSrc ? (
                <span
                    className={cn(
                        "flex size-6 items-center justify-center overflow-hidden rounded-full bg-gradient-to-b",
                        isInvitation
                            ? "from-[#FFFFFF] via-[#FFFFFFFD] to-[#3A3399FC]"
                            : "from-[#6055AF] to-[#3A3399FC]",
                        styles?.imageContainer,
                    )}
                >
                    <i className={cn("flex size-5 items-center justify-center", styles?.imageWrapper)}>
                        <img src={imgSrc} alt={`${username}-pfp`} className="rounded-full object-cover" />
                    </i>
                </span>
            ) : (
                <>{username.slice(0, 2).toUpperCase()}</>
            )}

            <span className={cn(styles?.text)}>@{username}</span>
        </div>
    );
}
