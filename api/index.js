const router = require('express').Router();
const RefusalError = require('./../utils/RefusalError');

router.post('/login', require('./login'));

router.use('/logout', require('./logout'));

router.use((err, req, res, next) => {
	if (err instanceof RefusalError) {
		// This isn't a server error
		// We are simply refusing to process the client's request
		res.status(403).json({
			success: false,
			error: {
				code: err.code,
				message: err.message
			}
		});
	} else {
		// Something went wrong with the server
		// Log it so we can review it
		console.error(err.stack);

		// Tell the client we don't know what happened
		res.status(500).json({
			success: false,
			error: {
				code: 'SERVER_ERROR',
				message:
					'There was an unexpected error processing that request. Let us know if this continues.'
			}
		});
	}
});

module.exports = router;
