var ACCESS_TOKEN = "27496966-2GhMd8Gh8lwo7yKkm58M3UVuE-o"
var Snoocore = window.Snoocore;
var hash = window.location.hash;

var reddit = new Snoocore({
	userAgent: '',
	throttle: 1000,
	oauth: {
		type: 'implicit',
		consumerKey: 'qVjwB7K3EUJBBg',
		redirectUri: 'http://localhost:31415/reddit-test.html',
		scope: [ 'read' ]
	}
});

$(function() {
	reddit.auth(ACCESS_TOKEN).then(function() {
		return reddit('/r/programming/comments/330zmm').get()
	}).then(function(data) {
		console.log(data)
		var comments = data[1].data.children
		
		var postId = data[0].data.children[0].data.id

		var html = '<a href="https://www.reddit.com/r/' + data[0].data.children[0].data.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/">View Post on /r/HummHumm</a>';

		for (var i = 0, l = comments.length; i < l; i++) {
			var c = comments[i].data;
			
			var decoded = $("<div/>").html(c.body_html).text();

			html +=
			'<div class="post">' +
				'<div class="body">' +
					decoded +
				'</div>' +
				'<div class="footer">' +
						'<a href="https://www.reddit.com/r/' + c.author + '">' +
							c.author +
						'</a>' +
						' &middot; ' +
						moment(new Date(c.created * 1000)).fromNow() +
						' &middot; ' +
						'<a href="https://www.reddit.com/r/' + c.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/' + c.id + '">' +
							'view/post replies' +
						'</a>' +
					'</div>' +
				'</div>' +
			'</div>';
		}

		$('#comments').html(html)
	});
})
