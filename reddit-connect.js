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