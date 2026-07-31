import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Method to verify passwords (handles both bcrypt hashes & plain-text fallbacks)
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Check if stored password is a bcrypt hash ($2a$ or $2b$)
  const isBcryptHash = this.password.startsWith('$2a$') || this.password.startsWith('$2b$');

  if (isBcryptHash) {
    return await bcrypt.compare(enteredPassword, this.password);
  }

  // Fallback for legacy plain-text entries in MongoDB
  return this.password === enteredPassword;
};

// Automatically hash new/updated passwords before saving to MongoDB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;