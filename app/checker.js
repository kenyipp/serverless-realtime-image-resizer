"use strict";

const AWS = require("aws-sdk");
const Sharp = require("sharp");
const logger = require("../utils/logger");

async function handler(event) {

	let config = {};

	if (process.env.IS_OFFLINE === "true") {
		config = {
			s3ForcePathStyle: true,
			accessKeyId: "S3RVER", // This specific key is required when working offline
			secretAccessKey: "S3RVER",
			endpoint: new AWS.Endpoint("http://localhost:8000"),
		};
	}

	const fileKey = event.Records[0].s3.object.key;

	const params = {
		Key: fileKey,
		Bucket: process.env.S3_BUCKET,
	};

	const s3 = new AWS.S3(config);

	try {
		const s3Reponse = await s3.getObject(params).promise();
		const metadata = await Sharp(s3Reponse.Body).metadata();
		if (!(["png", "jpeg"].includes(metadata.format))) {
			logger.debug(`invalid object format ${metadata.format}`);
		}
	} catch (error) {
		logger.error(error);
		await s3.deleteObject(params).promise();
	}

	return {};
}

module.exports.handler = handler;
