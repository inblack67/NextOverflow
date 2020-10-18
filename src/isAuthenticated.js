import jwt from 'jsonwebtoken';
import User from '../models/User';
import 'colors';
import asycnHandler from '../middlewares/asyncHandler';
import { initializeApollo } from './apollo';
import { getMeQuery } from './queries/auth';
import { parse } from 'cookie';
import ErrorResponse from './errorResponse';

export const extractTokenFromCookie = (ctx) => {
	let token;
	const cookie = ctx.req.headers.cookie;
	if (cookie) {
		token = parse(cookie).token;
	}
	return token;
};

export const isAuthWithToken = async (token) => {
	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	try {
		const user = await User.findById(decoded.id);
		if (!user) {
			return false;
		}
	} catch (err) {
		console.error(err);
	}

	return true;
};

// protect routes
export const isProtected = asycnHandler(async ({ req, res }) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.token) {
		token = req.cookies.token;
	}

	if (!token) {
		return false;
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	req.user = await User.findById(decoded.id);

	return true;
});
