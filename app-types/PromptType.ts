import { UserType } from "./UserType"

export type PromptType = {
    _id: string,
    prompt: string,
    tag: string,
    creator: UserType
}