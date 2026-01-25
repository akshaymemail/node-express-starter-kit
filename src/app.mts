import AppConfig from "~/configs/app.mts"
import express from "express"
import MongooseService from "~/lib/dbClient.mts"
import cors from "cors"
import corsConfig from "~/configs/cors.mts"
import modules from "~/routes/main.mts"

const { PORT, PREFIX } = AppConfig

// Initialize the MongooseService
const mongooseService = MongooseService.getInstance()
;(async () => {
  try {
    // Connect to the database
    await mongooseService.connect()
    console.log("Database connected successfully!")

    // Create the express app
    const app = express()

    // Middleware
    app.use(cors(corsConfig)) // configure cors config file as per requirement
    app.use(express.json())

    // Health check endpoint
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Hello, .mts files with Node.js and TypeScript!",
      })
    })

    // Map all app routes (v1)
    modules.forEach((module) => {
      const modulePath = `${PREFIX.V1}${module.path}`
      module.routes.forEach((route) => {
        const path = `${modulePath}${route.path}`
        console.log(`Registering: [${module.name}] -> ${path}`)
        app.use(path, route.router)
      })
    })

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("Gracefully shutting down...")
      await mongooseService.disconnect()
      process.exit(0)
    })

    process.on("SIGTERM", async () => {
      console.log("Process terminated.")
      await mongooseService.disconnect()
      process.exit(0)
    })
  } catch (error) {
    console.error("Error initializing the application:", error)
    process.exit(1) // Exit with failure code
  }
})()
