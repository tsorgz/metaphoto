import Fastify from 'fastify'
import cors from '@fastify/cors'
import ExternalAPI from './routes.js'

const fastify = Fastify({
    logger: true
})

fastify.register(cors, {
    origin: "*",
})
fastify.register(ExternalAPI, { prefix: "/externalapi"})

fastify.get("/", async (req, res) => {
    res.send({ hello: "world" })
})

await fastify.listen({ port: 3003 })