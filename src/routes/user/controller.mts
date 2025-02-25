import { Request, Response } from "express"
import HttpResponse from "@utils/response.mts"
import { UserPayload } from "@/types/main.mts"
import UserModel from "@models/user.mts"

interface AuthRequest extends Request {
  user?: UserPayload
}
class userControllers {
  public async getProfile(req: AuthRequest, res: Response): Promise<void> {
    //find user
    const foundUser = await UserModel.findOne({ email: req.user?.email })
    if (foundUser) {
      // user found
      HttpResponse.ok(res, {
        _id: foundUser._id,
        first_name: foundUser.first_name,
        last_name: foundUser.last_name,
        email: foundUser.email,
      })
    } else {
      // something went wrong, user not found
      HttpResponse.badRequest(
        res,
        "Something went wrong, please try again later."
      )
    }
  }
}

export default userControllers
