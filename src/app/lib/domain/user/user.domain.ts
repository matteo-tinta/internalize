import mongoose, { Model, model, Schema } from "mongoose";
import { RoleType } from "../role/role.domain";

export interface IUser {
  userId: string
  roles: RoleType[]
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }]
})

const UserModel: Model<IUser> = mongoose.models["User"] || model<IUser>("User", userSchema)
export type UserType = InstanceType<typeof UserModel>

export {
  UserModel as User
}