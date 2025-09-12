// import { prisma } from "#config/prisma.ts";

// export function userHandler({ io, socket }: Handler) {
//     socket.on("follow.streamer", async function ({ username }) {
//         console.log(`User ${socket.id} followed streamer: ${username}`);

//         try {
//             const whoWantsToFollow = await prisma.user.findUnique({ where: { privyId: socket.data.user } });
//             const whoIsToBeFollowed = await prisma.user.findUnique({ where: { username } });

//             console.log("Who wants to follow:", whoWantsToFollow?.username);
//             console.log("Who is to be followed:", whoIsToBeFollowed?.username);

//             socket.emit("follow.confirmed", {
//                 username,
//                 message: `You are now following ${username}`,
//             });
//         } catch (error) {
//             socket.emit("follow.error", {
//                 message: `Failed to follow ${username}: ${(error as Error).message}`,
//             });
//         }
//     });
// }
