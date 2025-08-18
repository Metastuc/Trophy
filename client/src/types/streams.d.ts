type tStreamJoinInfo = {
    roomId?: string;
    roomToken?: string;
};

type tStreamJoinActions = {
    setSession: (data: tStreamJoinInfo) => void;
};

type tStreamJoinStore = tStreamJoinInfo & tStreamJoinActions;
