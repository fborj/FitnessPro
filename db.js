import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URL;
if (!mongoURI) {
  throw new Error('MONGO_URL is not defined in the .env file.');
}

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Export mongoose to be used for creating models in your repository
export default mongoose;
