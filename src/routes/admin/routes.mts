import authRoutes from "./auth/route.mts"
import userRoutes from "./user/route.mts"

const ADMIN_ROUTES = [
      {
        name : "Admin Authentication",
        path : "/auth",
        router : authRoutes
      },
      {
        name : "Admin User",
        path : "/user",
        router : userRoutes
      }
    ]

export default ADMIN_ROUTES