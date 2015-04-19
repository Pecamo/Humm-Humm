var ACCESS_TOKEN = localStorage.getItem('accessToken');
var Snoocore = window.Snoocore;
var hash = window.location.hash;

var reddit = new Snoocore({
	userAgent: '',
	throttle: 1000,
	oauth: {
		type: 'implicit',
		consumerKey: 'wtf',
		redirectUri: 'wtf',
		scope: [ 'read' ]
	}
});


if (document.location.href.split('?').length < 2) {
	document.location = '/'
}

var postId = document.location.href.split('?')[1]

$(function() {
	reddit.auth(ACCESS_TOKEN).then(function() {
		return reddit('/r/programming/comments/'+postId).get()
	}).then(function(data) {
		console.log(data)
		var post = data[0].data.children[0].data
		var comments = data[1].data.children

		var html = '<a href="https://www.reddit.com/r/' + post.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/">View Post on /r/HummHumm</a>';

		$('#audio').html('<audio controls preload autoplay load><source src="' + post.url + '" type="audio/wav"></audio>')

		for (var i = 0, l = comments.length; i < l; i++) {
			var c = comments[i].data;
			
			var decoded = $("<div/>").html(c.body_html).text();

			html +=
			'<div class="post">' +
				'<div class="body">' +
					decoded +
				'</div>' +
				'<div class="footer">' +
					'<a href="https://www.reddit.com/user/' + c.author + '">' +
						c.author +
					'</a>' +
					' &middot; ' +
					'<a href="https://www.reddit.com/r/' + c.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/' + c.id + '" title="view/post replies">' +
						moment(new Date(c.created_utc * 1000)).fromNow() +
					'</a>' +
				'</div>' +
			'</div>';
		}

		if (comments.length === 0) {
			html += '<div class="post"><p><em>There is no answer yet.</em></p></div>'
		}

		$('#comments').html(html)
	});
})
