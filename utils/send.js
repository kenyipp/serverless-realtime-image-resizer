"use strict";

module.exports = {

	image(file, hash, expires = 31536000) {
		return {
			statusCode: 200,
			headers: {
				"Content-Type": "image/jpeg",
				ETag: hash,
				"Cache-Control": `public, max-age${expires}`,
				Expires: new Date(Date.now() + expires * 1000).toUTCString(),
			},
			body: file,
			isBase64Encoded: true,
		};
	},

	json(object) {
		return {
			body: JSON.stringify({
				status: 1,
				server_time: Date.now(),
				version: "1.0",
				...object,
			}),
		};
	},

	accepted() {
		return {
			statusCode: 202,
		};
	},

	notModified() {
		return {
			statusCode: 304,
		};
	},

	badRequest() {
		return {
			statusCode: 400,
		};
	},

	forBidden() {
		return {
			statusCode: 403,
		};
	},

	internalServerError() {
		return {
			statusCode: 500,
		};
	},

	notFound() {
		return {
			statusCode: 404,
		};
	},

};
