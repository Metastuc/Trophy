import { FollowNotification } from "./components/follow";
import { PurchaseNotification } from "./components/purchase";
import { TipNotification } from "./components/tip";

export function RenderNotification(props: UserNotificationsData[number]["items"][number]) {
    switch (props.type) {
        case "FOLLOW":
            return <FollowNotification />;

        case "PURCHASE":
            return <PurchaseNotification />;

        case "TIP":
            return <TipNotification />;

        default:
            return null;
    }
}
