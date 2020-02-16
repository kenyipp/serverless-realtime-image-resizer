"use strict";

const crypto = require("crypto");

function hash(data) {
	
	if (typeof data !== "string") {
		throw new Error("Invalid data type");
	}

	return crypto.createHash("md5").update(data).digest("hex");
}

module.exports = hash;
