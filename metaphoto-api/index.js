// process.env.OPENAI_API_KEY = "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"

import Fastify from 'fastify'
import cors from '@fastify/cors'
import ExternalAPI from './routes.js'

const fastify = Fastify({
    logger: true
})

fastify.register(cors, {
    origin: "*",
})
fastify.register(ExternalAPI, { prefix: "/externalapi" })

await fastify.listen({ host: "0.0.0.0", port: 3003 })