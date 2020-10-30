const express = require('express')

const actionRouter = require('./action-router')
const projectRouter = require('./project-router')

const server = express()

server.use(express.json())

server.use('/api/actions', actionRouter)
server.use('/api/projects', projectRouter)

server.get('/', (req, res) => {
   res.send(`<p>Welcome to the Lambda Hubs API</p>`)
})

module.exports = server