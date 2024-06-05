import "@fastify/jwt";
import { JWT } from "@fastify/jwt";
import FastifyRequest from "fastify";
import { FastifyInstance } from "fastify";

declare module "fastify" {
	interface FastifyRequest {
		jwt: JWT;
	}

	export interface FastifyInstance {
		authenticate: any;
	}
}

type UserPayload = {
	id: number;
	username: string;
};

declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: UserPayload;
	}
}
