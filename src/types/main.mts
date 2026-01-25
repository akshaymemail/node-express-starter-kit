import { Request } from "express"
import { Types } from "mongoose"

export interface UserPayload {
  first_name: string
  last_name: string | undefined
  id: Types.ObjectId
}

export interface AuthRequest extends Request {
  user?: UserPayload
}
