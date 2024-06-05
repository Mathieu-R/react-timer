import { FastifyRequest, FastifyReply } from "fastify";

import { Timer } from "./timer.model";
import { idInput, timerInput } from "./timer.schema";

export const getTimersHandler = async (
	request: FastifyRequest,
	reply: FastifyReply
) => {
	const timers = await Timer.findAll();
	console.log(timers);
	return reply.code(200).send(timers);
};

// save favorite timer
export const addTimerHandler = async (
	request: FastifyRequest<{ Body: timerInput }>,
	reply: FastifyReply
) => {
	const timer = request.body;

	const { id } = await Timer.create({
		name: timer.name,
		duration: timer.duration,
	});

	return reply.code(200).send({ id });
};

export const deleteTimerHandler = async (
	request: FastifyRequest<{ Body: idInput }>,
	reply: FastifyReply
) => {
	const { id } = request.body;
	console.log(id);

	await Timer.destroy({
		where: { id },
	});

	return reply.code(200).send({
		message: `timer id=${id} removed`,
	});
};
