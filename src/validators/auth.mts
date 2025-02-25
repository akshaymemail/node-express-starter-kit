import { body } from "express-validator"

const AuthValidators = {
  login: [
    body("email").isEmail(),
    body("password").notEmpty().withMessage("Password is required!"),
  ],
  signup: [
    body("first_name").notEmpty().withMessage("First name is required!"),
    body("email").notEmpty().withMessage("Email is required!"),
    body("email").isEmail().withMessage("A Valid email is required!"),
    body("password").notEmpty().withMessage("Password is required!"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be minimum 8 characters!"),
  ],
}
export default AuthValidators
