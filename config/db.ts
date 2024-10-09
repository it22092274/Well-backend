import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://root:root@uee.gj6k6.mongodb.net/?retryWrites=true&w=majority&appName=uee' );
    console.log(`[mongo] MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
