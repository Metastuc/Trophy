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

    if (usersSnapshot.empty) {
      console.log(`[recordUserJoinedStream] No user found for address: ${walletAddress}`);
      return;
    }

    const userDoc = usersSnapshot.docs[0];
    const userDocId = userDoc.id;

    console.log(`[recordUserJoinedStream] Found user doc ID: ${userDocId}`);

    // Reference to livestreams/{roomId}/joinedUsers/{userDocId}
    await db
      .collection('livestreams')
      .doc(roomId)
      .collection('joinedUsers')
      .doc(userDocId)
      .set({
        joinedAt: new Date().toISOString(),
      });

    console.log(`[recordUserJoinedStream] Recorded user ${userDocId} joined stream ${roomId}`);
  } catch (err) {
    console.error(`[recordUserJoinedStream] Failed to record joined user`, err);
  }
};
