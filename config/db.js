import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      throw new Error('Missing MONGODB_URI inside environment profile');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('[HEAVYWEIGHT] Cloud MongoDB Atlas Connection Active');
  } catch (err) {
    console.error('[HEAVYWEIGHT] Cloud MongoDB Boot Error:', err.message);
    process.exit(1);
  }
};