import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from './db.js';
import { Merchandise } from '../models/Merchandise.js';

const envConfig = dotenv.config({ path: '.env.local' });
if (envConfig && envConfig.error) {
  console.error('Critical: Could not load .env.local file');
  process.exit(1);
}
const capsuleItems = [
  {
    id: 'hw-pullover',
    name: 'Boxy Pullover Hoodie',
    brand: 'HEAVYWEIGHT',
    price: 85.00,
    image: '/products/boxy-pullover.webp',
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'hw-zipup',
    name: 'Oversized Full-Zip Hoodie',
    brand: 'HEAVYWEIGHT',
    price: 90.00,
    image: '/products/oversized-zipup.webp',
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'hw-trackpants',
    name: 'Heavyweight Trackpants',
    brand: 'HEAVYWEIGHT',
    price: 75.00,
    image: '/products/heavyweight-trackpants.webp',
    category: 'bottoms',
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'hw-tee',
    name: 'Oversized Graphic Tee',
    brand: 'HEAVYWEIGHT',
    price: 40.00,
    image: '/products/oversized-tee.webp',
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

async function runSeeder() {
  try {
    await connectDatabase();

    const operations = capsuleItems.map((item) => ({
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true,
      },
    }));

    const response = await Merchandise.bulkWrite(operations);
    console.log(`Success: ${response.upsertedCount} written, ${response.modifiedCount} updated.`);
}catch (error) {
  console.error('Seeder transaction collapsed:', error);
} finally {
  await mongoose.connection.close();
  console.log('Database tunnel closed safely.');
  process.exit(0);
}
}

runSeeder();