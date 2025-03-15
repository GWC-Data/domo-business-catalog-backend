import mongoose from "mongoose";

const connectDB =  async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.name}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDB;