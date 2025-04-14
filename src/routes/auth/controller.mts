import { Request, Response } from "express"
import HttpResponse from "@utils/response.mts"
import BcryptService from "@lib/bcrypt.mts"
import JWTService from "@lib/jwt.mts"
import UserModel from "@models/user.mts"
import MESSAGES from "@/intl/main.mts"

class AuthControllers {
  // user login
  public async signin(req: Request, res: Response): Promise<void> {
    // Your login logic here
    //find user in db
    const { email, password } = req.body
    const foundUser = await UserModel.findOne({ email: email }).lean()
    if (foundUser) {
      // user exist
      // verify password
      const isMatched = await BcryptService.comparePassword(
        password,
        foundUser.password
      )
      if (isMatched) {
        // password is matched
        // sign token and respond
        const token = JWTService.signToken({
          first_name: foundUser.first_name,
          last_name: foundUser.last_name,
          id: foundUser._id as string,
        })
        HttpResponse.ok(res, { token })
      } else {
        // password is incorrect
        // inform user username or password is incorrect
        HttpResponse.badRequest(res, MESSAGES.USER.INCORRECT_CREDENTIALS)
      }
    } else {
      // user doesn't exist
      HttpResponse.badRequest(res, MESSAGES.USER.USER_NOT_FOUND)
    }
  }

  // user register
  public async register(req: Request, res: Response): Promise<void> {
    // Your register logic here
    const { body } = req
    try {
      const hashedPassword = await BcryptService.hashPassword(body.password)
      const newUser = new UserModel({ ...body, password: hashedPassword })
      await newUser.save()
      HttpResponse.ok(res, {
        message: MESSAGES.USER.REGISTRATION_COMPLETED,
      })
    } catch (error) {
      HttpResponse.internalServerError(res, error)
    }
  }
}

export default AuthControllers
