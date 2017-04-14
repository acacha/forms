const jsonServer = require('json-server')
const validate = require('./validate')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validate)
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
