import express from "express"
import userController from "./controller.mts"
import JWTService from "@lib/jwt.mts"

// express router
const userRoutes = express.Router()

// make all routes protected for user
userRoutes.use(JWTService.isAuth)

// user controller instance
const controllers = new userController()

// user routes
userRoutes.get("/profile", controllers.getProfile)

export default userRoutes
