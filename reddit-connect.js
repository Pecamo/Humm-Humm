function login() {
	var poney = reddit.getImplicitAuthUrl();
	document.location = poney;
}

function postLink(link, titleText) {
	reddit.auth(accessToken).then(function() {
		console.log("Before POST");
		return reddit('/api/submit').post({
			api_type: "json",
			kind: "link",
			sr: "HummHumm",
			title: titleText,
			then: "comments",
			url: link
		});
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);
	}).catch(function(data) {
		var body = data.body;
		var object = jQuery.parseJSON(body);
		var iden = object.json.captcha;
		console.log(iden);
		askToSolve(iden);
	});
}

function needsCaptcha() {
	reddit.auth(accessToken).then(function() {
		return reddit('/api/needs_captcha').get();
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);
	});
}

function newCaptcha() {
	return reddit.auth(accessToken).then(function() {
		return reddit('/api/new_captcha').post({
			api_type: "json"
		});
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);		
	});
}

function askToSolve(identifier) {
	reddit.auth(accessToken).then(function() {
		return reddit('/captcha/$iden').get({
			$iden: identifier
		});
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);		
	});
}