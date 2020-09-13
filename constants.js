require('dotenv').config();
const { randomBytes } = require('crypto');

// This is public so we don't have to worry about it being in the repo
exports.GOOGLE_CLIENT_ID =
	process.env.GOOGLE_CLIENT_ID ||
	'945751560363-lhloohdoh8051f7asvi07npamr0ctq9a.apps.googleusercontent.com';

exports.COOKIE_SECRET = process.env.COOKIE_SECRET || randomBytes(32).toString();
