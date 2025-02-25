import "dotenv/config" // Automatically loads environment variables

import("./src/app.mts")
  .then((res) => {
    // DO SOMETHING
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
