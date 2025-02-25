import { Response } from "express"
import logger from "@lib/logger.mts" // Import the logger

// Interfaces for type safety
interface ErrorResponse {
  success: false
  error: {
    message: string
    details?: any
  }
}

interface SuccessResponse<T> {
  success: true
  data: T
}

// Utility class for handling HTTP responses
class HttpResponse {
  private static isProduction = process.env.NODE_ENV === "production"

  // Private method for error handling
  private static error(
    res: Response,
    statusCode: number,
    message: string,
    details?: any
  ): void {
    const responseDetails = this.isProduction ? undefined : details

    // Log the error
    logger.error({ statusCode, message, details })

    // Send error response
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message,
        details: responseDetails,
      },
    }

    res.status(statusCode).json(errorResponse)
  }

  // Private method for success handling
  private static success<T>(res: Response, data: T): void {
    const successResponse: SuccessResponse<T> = {
      success: true,
      data,
    }

    res.status(200).json(successResponse)
  }

  // Public helper for success responses
  public static ok<T>(res: Response, data: T): void {
    this.success(res, data)
  }

  // Public helpers for common error status codes
  public static badRequest(
    res: Response,
    message = "Bad Request",
    details?: any
  ): void {
    this.error(res, 400, message, details)
  }

  public static unauthorized(
    res: Response,
    message = "Unauthorized",
    details?: any
  ): void {
    this.error(res, 401, message, details)
  }

  public static notFound(
    res: Response,
    message = "Not Found",
    details?: any
  ): void {
    this.error(res, 404, message, details)
  }

  public static internalServerError(
    res: Response,
    message = "Internal Server Error",
    details?: any
  ): void {
    this.error(res, 500, message, details)
  }

  // Public helper for validation errors
  public static validationError(res: Response, errors: any): void {
    this.error(res, 422, "Validation Failed", errors)
  }
}

export default HttpResponse
