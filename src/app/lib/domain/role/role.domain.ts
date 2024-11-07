import mongoose, { Model, model, Schema } from "mongoose";

export interface IRole {
  name: string
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true }
})

const RoleModel: Model<IRole> = mongoose.models["Role"] || model<IRole>("Role", roleSchema)
export type RoleType = InstanceType<typeof RoleModel>

export {
  RoleModel as Role
}