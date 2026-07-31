import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token (LOGIN)
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input presence
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter both email and password' });
    }

    // 2. Find user by lowercased email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // 3. Verify user exists AND password matches
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || user.role === 'admin',
        token: generateToken(user._id),
      });
    }

    // Return 401 if user not found or password incorrect
    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const cleanEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Pass PLAIN password -> User.js pre('save') hook handles hashing ONCE
    const user = await User.create({
      name,
      email: cleanEmail,
      password,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin || user.role === 'admin',
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || req.body.fullName || user.name;
    user.phone = req.body.phone || req.body.contactNumber || user.phone;

    // Optional: Update password if provided in body
    if (req.body.password) {
      user.password = req.body.password; // pre('save') will hash this automatically
    }

    const addressInput = req.body.address || req.body.deliveryAddress;
    if (addressInput) {
      user.shippingAddress = {
        ...(user.shippingAddress || {}),
        address: addressInput,
      };
    }

    const updated = await user.save();

    return res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      phone: updated.phone,
      shippingAddress: updated.shippingAddress,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle wishlist item
// @route   POST /api/users/wishlist
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'productId is required' });
    }

    const exists = user.wishlist.some((id) => id.toString() === productId);

    user.wishlist = exists
      ? user.wishlist.filter((id) => id.toString() !== productId)
      : [...user.wishlist, productId];

    await user.save();
    return res.json({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user.wishlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};