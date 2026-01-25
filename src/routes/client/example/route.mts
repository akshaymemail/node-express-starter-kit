import express from 'express'

const exampleRouter = express.Router()

// Define your example routes here
exampleRouter.get('/', (req, res) => {
  res.send('Example route works!')
})

export default exampleRouter