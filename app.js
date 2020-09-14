require('express-async-errors');
const express = require('express');
const app = express();
const jwtValidator = require('./middleware/jwtValidator');
const api = require('./api');
const nunjucks = require('nunjucks');
const { GOOGLE_CLIENT_ID, COOKIE_SECRET } = require('./constants');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const models = require('./database/models');
const crypto = require('crypto');

app.use(
	logger('dev', {
		skip: (req, res) =>
			res.statusCode < 400 && process.env.NODE_ENV === 'production'
	})
);

app.use(cookieParser(COOKIE_SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwtValidator);

app.use('/api', api);

nunjucks.configure('views', {
	autoescape: true,
	express: app
});

app.use((req, res, next) => {
	// If they're not signed in always send the sign in page
	if (!req.jwt) {
		res.render('sign-in.html', { GOOGLE_CLIENT_ID });
	} else {
		next();
	}
});

app.get('/', async (req, res) => {
	const application = await models.applications.findOne();

	const subHash = crypto
		.createHash('sha256')
		.update(String(application.id) + req.jwt.user.sub)
		.digest('hex');

	let userCode = await models.userCodes.findOne({
		where: {
			subHash
		}
	});

	if (!userCode) {
		userCode = await models.userCodes.create({
			applicationId: application.id,
			subHash,
			code: crypto.randomBytes(4).toString('hex').toUpperCase()
		});
	}

	res.render('index.html', {
		user: req.jwt.user,
		userCode
	});
});

module.exports = app;
