import { db } from '../utils/firebase.js';

export const getEpicStream = async (walletAddress: string): Promise<number | null> => {
  try {
    const streamsSnapshot = await db
      .collection('livestreams')
      .where('address', '==', walletAddress)
      .get();

    if (streamsSnapshot.empty) {
      console.log(`[getEpicStream] No livestreams found for address: ${walletAddress}`);
      return null;
    }

    let maxParticipants = 0;

    streamsSnapshot.forEach(doc => {
      const data = doc.data();
      const participants = data?.participants ?? 0;

      if (participants > maxParticipants) {
        maxParticipants = participants;
      }
    });

    console.log(`[getEpicStream] Max participants for ${walletAddress}: ${maxParticipants}`);
    return maxParticipants;
  } catch (error) {
    console.error(`[getEpicStream] Failed to get epic stream:`, error);
    return null;
  }
};