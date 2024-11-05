import mongoose, { Model, model, Schema } from "mongoose";

interface IUser {
  userId: string
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true }
})

const UserModel: Model<IUser> = mongoose.models["User"] || model<IUser>("User", userSchema)
export type UserType = InstanceType<typeof UserModel>

export {
  UserModel as User
}