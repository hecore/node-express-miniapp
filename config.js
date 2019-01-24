var path = require('path');

var env = process.env.NODE_ENV !== 'production';

module.exports = {
	env: env,
	sessionSecret: "changeme",
	projectName: "医疗报销",
	emailData: {
		templatesPath: path.join(__dirname, 'views/emails'),
		from: "MVP <mvp@example.com>",
		replyTo: "MVP <mvp@example.com>",
		proyectName: "MVP",
		contactEmail: "MVP <mvp@example.com>"
	},
	localLoginEnabled: true,
	registerEnabled: true,
	registerConfirmation: true,
	facebookLoginEnabled: false,
	FACEBOOK_APP_ID : "",
	FACEBOOK_APP_SECRET: "",
	FACEBOOK_CALLBACK_DOMAIN: ""
};
