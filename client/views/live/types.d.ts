interface LiveStreamContextValues {
    roomId: string;
}

interface LiveStreamContextActions {}

type LiveStreamContextValue = LiveStreamContextActions & LiveStreamContextValues;
