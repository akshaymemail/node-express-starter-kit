import AppConst from "~/constants/app.mts"
import ADMIN_ROUTES from "./admin/routes.mts"
import CLIENT_ROUTES from "./client/routes.mts"
const { MODULE } = AppConst
const modules = [
  {
    name: MODULE.ADMIN,
    path: `/${MODULE.ADMIN}`,
    routes: ADMIN_ROUTES,
  },
  {
    name: MODULE.CLIENT,
    path: `/${MODULE.CLIENT}`,
    routes: CLIENT_ROUTES,
  },
]
export default modules
