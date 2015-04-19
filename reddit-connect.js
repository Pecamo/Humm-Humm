function login() {
    var Snoocore = window.Snoocore;
    var hash = window.location.hash;

    var reddit = new Snoocore({
	  userAgent: 'HummHumm Web',
	  oauth: {
	    type: 'implicit',
	    consumerKey: 'qVjwB7K3EUJBBg',
	    redirectUri: document.location.href,
	    scope: [ 'identity', 'vote', 'submit', 'read' ],
	    expires_in: 7200
	  }
	});

	console.log("HEy");

	var poney = reddit.getImplicitAuthUrl();
	console.log(poney)
	document.location = poney;
	console.log("Got any grapes ?");
}