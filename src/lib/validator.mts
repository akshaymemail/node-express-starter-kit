import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

// Middleware to validate request payloads based on validators
const validate = (req: Request, res: Response, next: NextFunction): void => {
  // Extract validation errors from the request
  const errors = validationResult(req)

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    // Respond with all validation errors
    res.status(400).json({
      status: false,
      errors: errors.array()[0], // Return all errors for better feedback
    })
    return // Exit early to prevent calling `next()`
  }

  // Proceed to the next middleware or route handler
  next()
}

export default validate
