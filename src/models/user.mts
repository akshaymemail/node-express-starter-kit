import { Schema, model, Document } from "mongoose"

// Define a TypeScript interface for your document
interface User extends Document {
  first_name: string
  last_name: string
  email: string
  password: string
}

// Create the Mongoose schema
const UserSchema = new Schema<User>(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

// Create the Mongoose model
const UserModel = model<User>("User", UserSchema)

export default UserModel
