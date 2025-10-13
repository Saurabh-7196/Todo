// middleware/ensureDBConnection.js
import connectDB from '../config/db.js';

const ensureDBConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed' });
  }
};

export default ensureDBConnection;