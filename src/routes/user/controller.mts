import { Request, Response } from "express"
import HttpResponse from "@utils/response.mts"
import { UserPayload } from "@/types/main.mjs"
import UserModel from "@models/user.mts"
import MESSAGES from "@/intl/main.mjs"

interface AuthRequest extends Request {
  user?: UserPayload
}
class userController {
  public async getProfile(req: AuthRequest, res: Response): Promise<void> {
    //find user
    try {
      const foundUser = await UserModel.findById(req.user?.id)
        .select("-password -v")
        .lean()
      if (foundUser) {
        // user found
        HttpResponse.ok(res, foundUser)
      } else {
        // something went wrong, user not found
        HttpResponse.badRequest(res, MESSAGES.USER.PORFILE_DETAILS_NOT_FOUND)
      }
    } catch (error) {
      HttpResponse.internalServerError(res)
    }
  }
}

export default userController
