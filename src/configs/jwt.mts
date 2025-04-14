const JWTConfig = {
  EXPIRES_IN: Date.now() / 1000 + 60 * 60,
  SECRET: process.env.JWT_SECRET || "default",
}
export default JWTConfig
