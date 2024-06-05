import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import "dotenv/config";

import { Timer } from "./modules/timer/timer.model";
import timerRoutes from "./modules/timer/timer.route";
import { timerSchemas } from "./modules/timer/timer.schema";

import { PRODUCTION } from "./constants";

const FRONT_PORT = Number(process.env.FRONT_PORT || 3000);
const BACK_PORT = Number(process.env.BACK_PORT || 3000);

export const fastify = Fastify({
	logger: !PRODUCTION,
});

const corsOptions = {
	origin: `http://localhost:${FRONT_PORT}`,
	credentials: true,
	allowedHeaders: ["Content-Type"],
};

async function build() {
	await fastify.register(cors, corsOptions);

	fastify.setErrorHandler((error, request, reply) => {
		if (error instanceof ZodError) {
			return reply
				.status(400)
				.send({ message: "Validation error", issues: error.format() });
		}

		console.error(error);
		return reply.status(500).send({ message: "Internal server error" });
	});

	return fastify;
}

build()
	.then(async (fastify) => {
		await Timer.sync({});
		return fastify;
	})
	.then((fastify) => {
		// register schemas
		for (const schema of [...timerSchemas]) {
			fastify.addSchema(schema);
		}

		// register routes
		fastify.register(timerRoutes, {});

		fastify.listen({ port: BACK_PORT }, (err, address) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}

			console.log(`⚡ Server listening at ${address}`);
		});
	})
	.catch((err: Error) => console.error(err));
