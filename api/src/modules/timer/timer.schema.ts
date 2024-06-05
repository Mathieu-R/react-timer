import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const timerSchema = z.object({
	id: z.number(),
	name: z.string(),
	duration: z.number(),
});

const timersArraySchema = z.array(timerSchema);

const basicResponseSchema = z.object({
	message: z.string(),
});

const idSchema = z.object({
	id: z.number(),
});

export type timerInput = z.infer<typeof timerSchema>;
export type idInput = z.infer<typeof idSchema>;

export const { schemas: timerSchemas, $ref } = buildJsonSchemas(
	{
		timerSchema,
		timersArraySchema,
		idSchema,
		basicResponseSchema,
	},
	{ $id: "TimerSchema" }
);
