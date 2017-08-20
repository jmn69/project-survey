var mongoose = require('mongoose');
var passport = require('passport');

exports.authentication = function (req, res, next) {
	passport.authenticate("local-login", function (err, user, info) {

		if (err) return next(err)
		if (!user) {
			return res.json({ success: false, message: info.message })
		}
		req.login(user, loginErr => {
			if (loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
}

exports.authenticate = function (req, res, next) {
	return res.json({ authenticated: req.isAuthenticated() });
}