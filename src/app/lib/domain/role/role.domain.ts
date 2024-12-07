import mongoose, { Model, model, Schema } from "mongoose";
import { ActionDomainType } from "../action/action"

export interface IRole {
  name: string
  actions: ActionDomainType[]
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  actions: [{ type: Schema.Types.ObjectId, ref: "Action" }]
})

const RoleModel: Model<IRole> = mongoose.models["Role"] || model<IRole>("Role", roleSchema)
export type RoleType = InstanceType<typeof RoleModel>

export {
  RoleModel as Role
}