import { Request, Response } from "express"
import HttpResponse from "@utils/response.mts"
import BcryptService from "@lib/bcrypt.mts"
import JWTService from "@lib/jwt.mts"
import UserModel from "@models/user.mts"

class AuthControllers {
  // user login
  public async login(req: Request, res: Response): Promise<void> {
    // Your login logic here
    //find user in db
    const { email, username, password } = req.body
    const foundUser = await UserModel.findOne({ email: email })
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
          email: foundUser.email,
          _id: foundUser._id as string,
        })
        HttpResponse.ok(res, { token })
      } else {
        // password is incorrect
        // inform user username or password is incorrect
        HttpResponse.badRequest(
          res,
          "Either username or password is incorrect!"
        )
      }
    } else {
      // user doesn't exist
      HttpResponse.badRequest(res, `User doesn't exist`, {})
    }
  }

  // user register
  public async register(req: Request, res: Response): Promise<void> {
    // Your register logic here
    const { body } = req
    try {
      const hashedPassword = await BcryptService.hashPassword(body.password)
      const newUser = new UserModel({ ...body, password: hashedPassword })
      const userDoc = await newUser.save()
      HttpResponse.ok(res, {
        message: "Registraction completed! Please login now",
      })
    } catch (error) {
      console.log(error)
      HttpResponse.internalServerError(res, "", error)
    }
  }

  // check if username exist or not
  public async usernameStatus(req: Request, res: Response) {
    const { username } = req.body
    try {
      const user = await UserModel.findOne({ username: username })
      console.log(user)
      if (user) {
        HttpResponse.badRequest(res, "username already exist!")
      } else {
        HttpResponse.ok(res, "username available!")
      }
    } catch (error) {
      HttpResponse.internalServerError(
        res,
        "Something went wrong, Please try again later!"
      )
    }
  }
}

export default AuthControllers
