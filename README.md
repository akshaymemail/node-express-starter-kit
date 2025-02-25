# Node.js, Express & TypeScript Starter Kit

This is a boilerplate for building backend applications using Node.js, Express, and TypeScript. It includes basic authentication using JWT, essential configurations, and a well-structured folder setup for scalability.

## Features

- **TypeScript** for better type safety
- **Express.js** as the web framework
- **JWT Authentication** for secure user authentication
- **Structured Codebase** for maintainability and scalability
- **Pre-configured Scripts** for development and production

## Folder Structure

```
logs/                # Log files
node_modules/        # Node.js dependencies
src/
 ├── configs/        # Configuration files
 ├── constants/      # Constant values
 ├── lib/            # Utility libraries
 ├── middlewares/    # Custom middlewares
 ├── models/         # Database models
 ├── public/         # Public assets (if needed)
 ├── routes/         # API route handlers
 ├── scripts/        # Scripts for automation
 ├── tests/          # Test files
 ├── types/          # TypeScript type definitions
 ├── utils/          # Helper functions
 ├── validators/     # Input validation logic
 ├── app.mts         # Main Express application entry
.entry.mts           # Application bootstrap file
.env                 # Environment variables
.gitignore           # Git ignore file
.prettierrc.json     # Prettier configuration
nodemon.json         # Nodemon configuration for development
package.json         # Node.js package file
package-lock.json    # Lock file for dependencies
README.md            # Project documentation
tsconfig.json        # TypeScript configuration
```

## Installation & Setup

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up environment variables**
   - Create a `.env` file in the root directory and add necessary environment variables like `PORT`, `JWT_SECRET`, `MONGODB_URI`, etc.
4. **Run the project**
   - Development mode:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm start
     ```
5. **API Endpoints**
   - `POST /api/v1/auth/register` → User registration
   - `POST /api/v1/auth/login` → User login (returns JWT token)
   - `GET /api/v1/user/profile` → Example protected route (Requires JWT)

## Contribution

Feel free to submit pull requests or suggest improvements to this starter kit!

## License

This project is open-source and available under the [MIT License](LICENSE).
