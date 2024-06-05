import { CookieSerializeOptions } from "@fastify/cookie";

export const PRODUCTION = process.env.NODE_ENV === "production";

export const COOKIES_OPTIONS: CookieSerializeOptions = {
	path: "/",
	secure: PRODUCTION,
	sameSite: "none",
	httpOnly: false,
	maxAge: 86400 * 7, // 1 week
	domain: "*",
};
