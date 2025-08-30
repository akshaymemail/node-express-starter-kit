import dotenv from "dotenv"
const envFile = `.env.${process.env.NODE_ENV}`
if (!envFile) {
  throw new Error("Environment file is not set.")
}
dotenv.config({
  path: envFile,
})

import("./src/app.mts")
  .then((res) => {
    // DO SOMETHING
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
