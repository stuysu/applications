module.exports = (req, res) => {
	res.cookie('auth-jwt', '', {
		maxAge: 0,
		overwrite: true
	});

	res.json({ success: true });
};
