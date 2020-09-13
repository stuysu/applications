class RefusalError extends Error {
	constructor(message, code) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
		this.name = 'RefusalError';
		this.code = code;
	}
}

module.exports = RefusalError;
