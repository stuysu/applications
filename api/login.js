const { GOOGLE_CLIENT_ID, COOKIE_SECRET } = require('./../constants');
const { sign } = require('jsonwebtoken');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const RefusalError = require('./../utils/RefusalError');

module.exports = async (req, res) => {
	if (req.jwt) {
		throw new RefusalError('You are already signed in.', 'FORBIDDEN');
	}

	let payload;

	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.idToken,
			audience: GOOGLE_CLIENT_ID
		});

		payload = ticket.getPayload();
	} catch (e) {
		console.log(e);
		throw new RefusalError(
			'The provided sign in token is invalid.',
			'FORBIDDEN'
		);
	}

	if (!payload.email_verified) {
		throw new RefusalError(
			'Your email is not verified and cannot be used for sign in yet.',
			'FORBIDDEN'
		);
	}

	if (payload.azp !== GOOGLE_CLIENT_ID || payload.aud !== GOOGLE_CLIENT_ID) {
		throw new RefusalError(
			'That login token was not generated for this app and cannot be used.',
			'FORBIDDEN'
		);
	}

	if (!payload.email.endsWith('@stuy.edu')) {
		throw new RefusalError(
			'You are only allowed to sign in with your stuy.edu email address.'
		);
	}

	const token = sign(
		{
			user: {
				email: payload.email,
				name: payload.name,
				sub: payload.sub
			},
			audience: 'applications.stuysu.org',
			issuer: 'applications.stuysu.org'
		},
		COOKIE_SECRET,
		{ expiresIn: '14d' }
	);

	res.cookie('auth-jwt', token);

	res.json({ success: true });
};
