"use strict";

const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
	s3ForcePathStyle: true,
	accessKeyId: "S3RVER", // This specific key is required when working offline
	secretAccessKey: "S3RVER",
	endpoint: new AWS.Endpoint("http://localhost:8000"),
});

s3
	.putObject({
		Bucket: "serverless-s3-image-source-20200216-4",
		Key: "image.jpg",
		Body: fs.readFileSync("./src/image.jpg"),
	})
	.promise()
	.then(console.log)
	.catch((error) => console.error(error));
