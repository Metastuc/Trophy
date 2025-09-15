// import { useLocalAudio, useLocalVideo, useRoom } from "@huddle01/react/hooks";
// import { useEffect } from "react";

// export function useHuddleHostPublish(role: JoinStreamData["role"]) {
//     const { isVideoOn, enableVideo } = useLocalVideo({
//         onProduceClose(reason) {
//             console.log(`Video production closed: ${reason}`);
//             console.log(reason?.code, reason?.message, reason?.tag);
//         },
//         onProduceStart(producer) {
//             console.log(`Video production started: ${producer}`);
//             console.log(producer.id, producer.kind, producer.rtpParameters);
//         },
//     });
//     const { isAudioOn, enableAudio } = useLocalAudio();
//     const { state } = useRoom();

//     console.log(`Huddle host role: ${role}, video on: ${isVideoOn}, audio on: ${isAudioOn}, state: ${state}`);

//     useEffect(
//         function () {
//             if (role !== "host" || state !== "connected") return;

//             // Promise.all([
//             //     !isVideoOn ? enableVideo() : Promise.resolve(),
//             //     !isAudioOn ? enableAudio() : Promise.resolve(),
//             // ]).catch(function (error) {
//             //     toast.error((error as Error).message);
//             // });

//             console.log("Huddle host is ready to publish");

//             (async function () {
//                 await enableVideo();
//             })();
//         },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [role, state],
//     );
// }
