function login() {
	var poney = reddit.getImplicitAuthUrl();
	document.location = poney;
}

function postLink(link, titleText, iden, captchaCode) {
	var params = {
			api_type: "json",
			kind: "link",
			sr: "HummHumm",
			title: titleText,
			then: "comments",
			url: link
		};
	if (typeof iden !== 'undefined') {
		console.log("if (typeof iden !== 'undefined') {", iden, captchaCode)
		params.iden = iden;
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
		var newIden = object.json.captcha;
		console.log('object', object)
		console.log("New Identifier : " + newIden);
		console.log("CAPTCHA : " + captchaCode);
		showCaptcha(link, titleText, newIden);
	});
}
