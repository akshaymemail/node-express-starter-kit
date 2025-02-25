import express from "express"
import AuthControllers from "./controller.mts"
import AuthValidators from "@/validators/auth.mts"
import validate from "@/lib/validator.mts"

// express router for auth
const authRoutes = express.Router()

// auth controller instance
const controllers = new AuthControllers()

// auth routes
authRoutes.post("/login", AuthValidators.login, validate, controllers.login)
authRoutes.post(
  "/register",
  AuthValidators.signup,
  validate,
  controllers.register
)

export default authRoutes
