import { Request } from "express"

export interface UserPayload {
  first_name: string
  last_name: string | undefined
  id: string
}

export interface AuthRequest extends Request {
  user?: UserPayload
}
