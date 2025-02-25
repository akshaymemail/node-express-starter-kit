import express from "express"
import userControllers from "./controller.mts"
import JWTService from "@lib/jwt.mts"

// express router
const userRoutes = express.Router()

// make all routes protected for user
userRoutes.use(JWTService.isAuth)

// user controller instance
const controllers = new userControllers()

// user routes
userRoutes.get("/profile", controllers.getProfile)

export default userRoutes
