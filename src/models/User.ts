import mongoose, { Schema, Document } from 'mongoose'
import isEmail from 'validator/lib/isEmail'

export interface IUser extends Document{
  email: string,
  fullname: string,
  password: string,
  confirmed: boolean,
  avatar?: string,
  confirm_hash?: string,
  last_seen?: Date
}



const UserSchema = new Schema(
{
  email: {
    type: String,
    require: 'Email address is required',
    validate: [isEmail, 'Invalid email'],
    unique: true
  },
  fullname: {
    type: String,
    require: 'Fullname is required',
  },
  password: {
    type: String,
    require: 'Password is required',
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  avatar: String,
  confirmed_hash: String,
  last_seen: {
    type: Date,
    default: new Date()
  },
}, {
  timestamps: true
})

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
