import { FastifyInstance } from "fastify";

import {
	getTimersHandler,
	addTimerHandler,
	deleteTimerHandler,
} from "./timer.controller";

import { $ref } from "./timer.schema";

const userRoutes = async (server: FastifyInstance) => {
	// get bookmarked timers
	server.get(
		"/timers",
		{
			preHandler: server.authenticate,
			schema: {
				response: { 200: $ref("timersArraySchema") },
			},
		},
		getTimersHandler
	);

	// add a bookmarked timer
	server.post(
		"/timer",
		{
			schema: {
				body: $ref("timerSchema"),
				response: { 200: $ref("idSchema") },
			},
		},
		addTimerHandler
	);

	// delete a bookmarked timer
	server.delete(
		"/timer",
		{
			schema: {
				body: $ref("idSchema"),
				response: { 200: $ref("basicResponseSchema") },
			},
		},
		deleteTimerHandler
	);
};

export default userRoutes;
