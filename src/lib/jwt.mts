import { NextFunction, Request, Response } from "express"
import JWT from "jsonwebtoken"
import HttpResponse from "@utils/response.mts"
import { AuthRequest, UserPayload } from "@/types/main.mjs"
import JWTConfig from "@/configs/jwt.mts"
import MESSAGES from "@/intl/main.mts"

const { ERROR } = MESSAGES

class JWTService {
  public static signToken(payload: UserPayload): string {
    const token = JWT.sign(payload, JWTConfig.SECRET, {
      expiresIn: JWTConfig.EXPIRES_IN,
    })
    return token
  }

  public static verifyToken(token: string): UserPayload | null {
    try {
      const decoded = JWT.verify(token, JWTConfig.SECRET) as UserPayload
      return decoded
    } catch (error) {
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
            HttpResponse.unauthorized(res, ERROR.INVALID_OR_EXPIRED_TOKEN)
          }
        } else {
          HttpResponse.unauthorized(res, ERROR.INVALID_TOKEN_PROVIDED)
        }
      } catch (error) {
        console.warn(error)
        HttpResponse.internalServerError(res, error)
      }
    } else {
      // no token attached
      HttpResponse.unauthorized(res, ERROR.NO_TOKEN_PROVIDED)
    }
  }
}

export default JWTService
