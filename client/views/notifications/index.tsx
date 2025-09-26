import { FollowNotification } from "./components/follow";
import { PurchaseNotification } from "./components/purchase";
import { TipNotification } from "./components/tip";

export function RenderNotification({ type, ...rest }: UserNotificationsData[number]["items"][number]) {
    switch (type) {
        case "FOLLOW":
            return <FollowNotification {...rest} />;

        case "PURCHASE":
            return <PurchaseNotification {...rest} />;

        case "TIP":
            return <TipNotification {...rest} />;

        default:
            return null;
    }
}
