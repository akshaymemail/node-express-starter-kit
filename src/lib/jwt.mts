import { NextFunction, Request, Response } from "express"

import JWT from "jsonwebtoken"
import HttpResponse from "@utils/response.mts"
import { UserPayload } from "@/types/main.mts"

interface AuthRequest extends Request {
  user: UserPayload
}

class JWTService {
  public static signToken(payload: UserPayload): string {
    const token = JWT.sign(payload, process.env.JWT_SECRET || "default")
    return token
  }

  public static verifyToken(token: string): UserPayload | null {
    try {
      const decoded = JWT.verify(
        token,
        process.env.JWT_SECRET || "default"
      ) as UserPayload
      return decoded
    } catch (error) {
      console.error("JWT Verification Error:", error)
      return null // Return null if the token is invalid or expired
    }
  }
  public static isAuth(req: Request, res: Response, next: NextFunction): void {
    const authReq = req as AuthRequest
    const authorization = req.headers.authorization
    if (authorization) {
      // authorization header found
      try {
        const token = authorization.split(" ")[1]

        if (token) {
          // token found, now verify the token
          const user = JWTService.verifyToken(token)
          if (user) {
            authReq.user = user
            next()
          } else {
            HttpResponse.unauthorized(res, "Invalid or expired token")
          }
        } else {
          HttpResponse.unauthorized(res, "Invalid token provided")
        }
      } catch (error) {
        console.warn(error)
        HttpResponse.internalServerError(res, "Internal server error!", error)
      }
    } else {
      // no token attached
      HttpResponse.unauthorized(res, "No token provided")
    }
  }
}

export default JWTService
