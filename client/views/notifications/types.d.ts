type FollowNotificationProps = Omit<UserNotificationsData[number]["items"][number], "id" | "tip" | "type">;

type PurchaseNotificationProps = Omit<UserNotificationsData[number]["items"][number], "id" | "tip" | "type">;

type TipNotificationProps = Omit<UserNotificationsData[number]["items"][number], "id" | "follow" | "type">;
