import { WithId } from "mongodb"

export type UserModel = WithId<Document> & {
  userId: string
}