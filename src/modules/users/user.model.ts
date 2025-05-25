import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config/config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 3,
      required: true,
    },
    role: {
      type: String,
      enum: ['customer','admin',],
      default: 'customer',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// hashed password
userSchema.pre('save', async function () {
  this.password = bcrypt.hashSync(this.password, Number(config.saltRound));
});

// empty password after save as response
// userSchema.post('save', async function () {
//   this.password = '';
// });

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Export User model
export const User = model<TUser>('User', userSchema);
