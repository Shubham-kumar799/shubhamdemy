const mongoose = require('mongoose');
const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    userimage: {
      type: String,
      default: '/avatar.png',
    },
    role: {
      type: [String],
      default: ['Subscriber'],
      enum: ['Subscriber', 'Instructor', 'Admin'],
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {},
    courses: [
      {
        type: ObjectId,
        ref: 'Course',
      },
    ],
    passwordResetCode: {
      data: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
