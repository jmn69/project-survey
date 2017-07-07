var mongoose = require('mongoose');
var passport = require('passport');

exports.login = function(req, res, next) {
	passport.authenticate("local-login", function(err, user, info) {		

		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}
		req.logIn(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
}