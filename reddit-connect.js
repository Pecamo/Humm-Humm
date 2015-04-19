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
	reddit.auth(accessToken).then(function() {
		return reddit('/api/new_captcha').post({
			api_type: "json"
		});
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);		
	});
}

function captchaIden(identifier) {
	reddit.auth(accessToken).then(function() {
		return reddit('/captcha/$iden').get({
			$iden: identifier
		});
	}).then(function(data) {
		console.log("After POST : ");
		console.log(data);		
	});
}