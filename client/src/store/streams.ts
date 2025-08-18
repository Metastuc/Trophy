import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useStreamStore = create<tStreamJoinStore>()(
    persist(
        (set) => ({
            roomId: undefined,
            roomToken: undefined,

            setSession: ({ roomId, roomToken }) => set({ roomId, roomToken }),
        }),
        {
            name: "stream-storage",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
