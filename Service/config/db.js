import mongoose from 'mongoose';

// ✅ Cache connection for serverless (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // ✅ Return existing connection
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // ✅ Disable buffering for serverless
    };

    // ✅ Remove deprecated options (useNewUrlParser, useUnifiedTopology)
    // They're no longer needed in Mongoose 6+
    
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        cached.promise = null; // ✅ Reset on error
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null; // ✅ Reset promise on failure
    throw error;
  }
};

export default connectDB;