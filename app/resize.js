"use strict";

const AWS = require("aws-sdk");
const _ = require("lodash");
const Joi = require("joi");
const Sharp = require("sharp");
const hash = require("../utils/hash");
const logger = require("../utils/logger");
const send = require("../utils/send");

const resizeSchema = Joi.object({
	size: Joi
		.string()
		.valid(["300x300", "500x500", "700x700"])
		.description("The allow resize image sizes ")
		.required(),
	filename: Joi
		.string()
		.description("The filename exist in the S3 bucket")
		.required(),
});

async function handler(event) {
	const { error, value } = Joi.validate(event.pathParameters, resizeSchema);

	if (error) {
		logger.error(error);
		return send.notFound();
	}

	let config;

	if (process.env.IS_OFFLINE === "true") {
		config = {
			s3ForcePathStyle: true,
			accessKeyId: "S3RVER", // This specific key is required when working offline
			secretAccessKey: "S3RVER",
			endpoint: new AWS.Endpoint("http://localhost:8000"),
		};
	}

	const { size, filename } = value;
	const [width, height] = size.split("x").map(_.unary(parseInt));
	const ifNoMatch = event.headers["If-None-Match"] || "x";

	const params = {
		Key: filename,
		Bucket: process.env.S3_BUCKET,
	};

	try {
		const s3 = new AWS.S3(config);
		const body = s3.getObject(params).createReadStream();
		const eTag = hash(body.ETag + size);

		if (ifNoMatch === eTag)
			return send.notModified();

		const buffer = await body.pipe(Sharp().resize(width, height)).toBuffer();
		const image = buffer.toString("base64");

		return send.image(image, eTag);
	} catch (error) {
		logger.debug(error);
		return send.notFound();
	}
}

module.exports.handler = handler;
