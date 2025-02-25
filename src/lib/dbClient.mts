import mongoose from "mongoose"

class MongooseService {
  private static instance: MongooseService // Singleton instance
  private dbUri: string

  private constructor() {
    // Private constructor for Singleton pattern
    this.dbUri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/myDatabase" // Default URI
  }

  // Singleton instance method
  public static getInstance(): MongooseService {
    if (!MongooseService.instance) {
      MongooseService.instance = new MongooseService()
    }
    return MongooseService.instance
  }

  // Connect to the database
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.dbUri, {} as mongoose.ConnectOptions)
      console.log("Connected to MongoDB successfully!")
    } catch (error) {
      console.error("Error connecting to MongoDB:", error)
      process.exit(1) // Exit process if unable to connect
    }
  }

  // Disconnect from the database
  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect()
      console.log("Disconnected from MongoDB.")
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error)
    }
  }

  // Add event listeners (optional but recommended for monitoring)
  private setupListeners(): void {
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to the database.")
    })

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err)
    })

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected.")
    })
  }
}

export default MongooseService
