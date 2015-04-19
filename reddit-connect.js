function login() {
	var poney = reddit.getImplicitAuthUrl();
	document.location = poney;
}

function postLink() {
	var poney = reddit.getImplicitAuthUrl();
	console.log(poney)
	document.location = poney;
	console.log("Got any grapes ?");
}