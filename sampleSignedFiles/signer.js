var express = require("express");
var app = express();
var jws = require('jws');
var fs = require('node-fs');

app.get('/', function(req, res) {

	//prepare the assertion
	var assertion = {
		"@context": "https://w3id.org/openbadges/v2",
		"id": "urn:uuid:a953081a-4bbd-4927-9653-7219bca00e3b",
		"type": "Assertion",
		"recipient": {
		  "type": "email",
		  "identity": "domey11.11.11@gmail.com",
		  "hashed": false
		},
		"issuedOn": "2016-12-31T23:59:59+00:00",
		"verification": {
			"type": "SignedBadge",
			"url": "https://raw.githubusercontent.com/mekabuko/openBadgeIssuerExample/master/sampleSignedFiles/public-key.pem"
		},
		"badge": {
			"type": "BadgeClass",
			"id": "https://raw.githubusercontent.com/mekabuko/openBadgeIssuerExample/master/sampleSignedFiles/BadgeClass.json",
			"name": "sample signed badge Test",
			"description": "example signed open badge issuer.",
			"image": "https://raw.githubusercontent.com/mekabuko/openBadgeIssuerExample/master/sampleSignedFiles/badgeImage.png",
			"criteria": {
				"narrative": "Students are tested on knowledge and safety, both through a paper test and a supervised performance evaluation on live equipment"
			},
			"issuer": {
				"id": "https://github.com/mekabuko",
				"type": "Profile",
				"name": "sample mekabu badge issuer",
				"url": "https://github.com/mekabuko"
			}
		},
	};

	//sign the assertion
	const signature = jws.sign({
		header: {alg: 'RS256'},
		payload: assertion,
		privateKey: fs.readFileSync(__dirname + '/private-key.pem')
	});
	//for demonstration, write the signature to the browser
	res.send(signature);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});