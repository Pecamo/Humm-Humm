function login() {
	var poney = reddit.getImplicitAuthUrl();
	document.location = poney;
}

function postLink(link, titleText, captchaIdentifier, captchaCode) {
	var params = {
			api_type: "json",
			kind: "link",
			sr: "HummHumm",
			title: titleText,
			then: "comments",
			url: link
		};
	if (typeof captchaIdentifier !== 'undefined') {
		console.log("if (typeof captchaIdentifier !== 'undefined') {", captchaIdentifier, captchaCode)
		params.iden = captchaIdentifier;
		params.captcha = captchaCode;
	}
	reddit.auth(accessToken).then(function() {
		console.log("Before POST LINK");
		console.log("params :");
		console.log(params);
		return reddit('/api/submit').post(params);
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);
	}).catch(function(data) {
		var body = data.body;
		var object = jQuery.parseJSON(body);
		var iden = object.json.iden;
		console.log('data, body, object', data, body, object)
		console.log("Identifier : " + iden);
		console.log("CAPTCHA : " + captchaIdentifier);
		showCaptcha(link, titleText, "https://www.reddit.com/captcha/"+iden, iden);
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