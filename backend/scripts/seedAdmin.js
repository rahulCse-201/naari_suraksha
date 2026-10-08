import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/naari_suraksha';
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB for admin seeding at ${mongoUri}`);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@naarisuraksha.gov.in';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass123!';
    const adminName = process.env.ADMIN_NAME || 'System Administrator';
    const adminPhone = process.env.ADMIN_PHONE || '+919876543210';

    let admin = await User.findOne({ email: adminEmail });

    if (admin) {
      console.log(`Admin user with email ${adminEmail} already exists. Updating credentials...`);
      admin.name = adminName;
      admin.phone = adminPhone;
      admin.password = adminPassword;
      admin.role = 'ADMIN';
      await admin.save();
      console.log('Admin account updated successfully.');
    } else {
      admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        phone: adminPhone,
        role: 'ADMIN'
      });
      console.log('Admin account created successfully.');
    }

    console.log('--- Admin Credentials ---');
    console.log(`Email: ${adminEmail}`);
    console.log(`Role: ${admin.role}`);
    console.log('-------------------------');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin account:', error);
    process.exit(1);
  }
};

seedAdmin();
