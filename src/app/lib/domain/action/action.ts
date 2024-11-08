import mongoose, { Model, model, Schema } from "mongoose";

export interface IAction {
  name: string,
}

const actionSchema = new Schema<IAction>({
  name: { type: String, required: true },
})

const ActionModel: Model<IAction> = mongoose.models["Action"] || model<IAction>("Action", actionSchema)
export type ActionDomainType = InstanceType<typeof ActionModel>

export {
  ActionModel as Action
}