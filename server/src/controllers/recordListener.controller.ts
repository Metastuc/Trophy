import { db } from '../utils/firebase.js';

/**
 * Records a user as having joined a livestream.
 *
 * @param {string} walletAddress - The wallet address of the user.
 * @param {string} roomId - The ID of the livestream room.
 */
export const recordStreamJoin = async (walletAddress: string, roomId: string) => {
    try {
      console.log(`[recordUserJoinedStream] Searching for user with address: ${walletAddress}`);
  
      const usersSnapshot = await db
        .collection('users')
        .where('walletAddress', '==', walletAddress)
        .get();
  
      const livestreamRef = db.collection('livestreams').doc(roomId);
      const livestreamSnap = await livestreamRef.get();
  
      if (!livestreamSnap.exists) {
        console.log(`[recordUserJoinedStream] Livestream not found for roomId: ${roomId}`);
        return;
      }
  
      const livestreamData = livestreamSnap.data();
      const currentParticipants = livestreamData?.participants ?? 0;
  
      if (usersSnapshot.empty) {
        console.log(`[recordUserJoinedStream] No user found. Incrementing participant count only.`);
        await livestreamRef.update({
          participants: currentParticipants + 1
        });
        return;
      }
  
      const userDoc = usersSnapshot.docs[0];
      const userDocId = userDoc.id;
  
      const joinedUserRef = livestreamRef.collection('joinedUsers').doc(userDocId);
      const joinedUserSnap = await joinedUserRef.get();
  
      if (joinedUserSnap.exists) {
        console.log(`[recordUserJoinedStream] User already joined this stream. Skipping update.`);
        return;
      }
  
      // Increment participant count and add user to joinedUsers
      await Promise.all([
        livestreamRef.update({
          participants: currentParticipants + 1
        }),
        joinedUserRef.set({
          joinedAt: new Date().toISOString()
        })
      ]);
  
      console.log(`[recordUserJoinedStream] User ${userDocId} joined stream ${roomId}`);
    } catch (err) {
      console.error(`[recordUserJoinedStream] Failed to record joined user`, err);
    }
};
