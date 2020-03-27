var express = require("express");
var app = express();
var jws = require('jws');
var fs = require('node-fs');

app.get('/', function(req, res) {

	//prepare the assertion
	var assertion = {
		"uid": "a1b2c3d4e5",
		"recipient": {
		  "type": "email",
		  "identity": "domey11.11.11@gmail.com",
		  "hashed": false
		},
		"issuedOn":  1585194520,
		"badge": "https://raw.githubusercontent.com/mekabuko/openBadgeIssuerExample/master/sampleSigedFiles/BadgeClass.json",
		"verify": {
		  "type": "signed",
		  "url": "https://raw.githubusercontent.com/mekabuko/openBadgeIssuerExample/master/sampleSigedFiles/public-key.pem"
		}
	};

	//sign the assertion
	const signature = jws.sign({
		header: {alg: 'rs256'},
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