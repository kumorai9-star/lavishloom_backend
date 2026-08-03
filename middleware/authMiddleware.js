import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract clean token string
      token = req.headers.authorization.split(' ')[1];

      // Handle accidental double "Bearer Bearer"
      if (token === 'Bearer') {
        token = req.headers.authorization.split(' ')[2];
      }

      // 2. FIXED HERE: Added matching fallback key so jwt.verify never receives undefined!
      const secret = process.env.JWT_SECRET || 'fallback_secret_key_123';
      const decoded = jwt.verify(token, secret);

      // 3. Find user in database (handles both decoded.id and decoded._id)
      const userId = decoded.id || decoded._id;
      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found in database' });
      }

      return next(); // Token is valid, proceed to controller
    } catch (error) {
      console.error('JWT Verification Error:', error.message);

      return res.status(401).json({ 
        message: `Token verification failed: ${error.message}` 
      });
    }
  }

  // 4. No token header present
  return res.status(401).json({ message: 'Not authorized, no token present' });
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Restricted to Admin operations' });
  }
};