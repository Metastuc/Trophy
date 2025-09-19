// import { getRoom } from "#services/redis/room.ts";

// export function guestsHandler({ io, socket }: Handler) {
//     socket.on("guest.invite", async function ({ roomId, userId }: { roomId: string; userId: string }) {
//         const { participants } = await getRoom(roomId);
//         const sender = participants.find((participant) => participant.id === socket.data.userId);
//     });

//     socket.on("guest.accept", async function ({}: { roomId: string; userId: string }) {});

//     socket.on("guest.deny", async function ({}: { roomId: string; userId: string }) {});

//     socket.on("guest.cancel", async function ({}: { roomId: string; userId: string }) {});

//     socket.on("guest.revoke", async function ({}: { roomId: string; userId: string }) {});
// }
