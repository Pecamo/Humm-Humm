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

var reddit2 = new Snoocore({
	userAgent: '',
	throttle: 1000,
	oauth: {
		type: 'implicit',
		consumerKey: 'wtf',
		redirectUri: 'wtf',
		scope: [ 'read', 'submit' ]
	}
});


if (document.location.href.split('?').length < 2) {
	document.location = '/'
}

var postId = document.location.href.split('?')[1]

$(function() {
	reddit.auth(ACCESS_TOKEN).then(function() {
		return reddit('/r/hummhumm/comments/'+postId).get()
	}).then(function(data) {
		var post = data[0].data.children[0].data
		var comments = data[1].data.children

		console.log(post)

		var html = '<a href="https://www.reddit.com/r/' + post.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/">View Post on /r/HummHumm</a>';

		$('#audio').html('<audio controls autoplay preload loop><source src="' + post.url.replace("player", "sounds") + '" type="audio/wav"></audio>')

		for (var i = 0, l = comments.length; i < l; i++) {
			var c = comments[i].data;
			
			var decoded = $("<div/>").html(c.body_html).text();

			html +=
			'<div class="post">' +
				'<div class="body">' +
					decoded +
				'</div>' +
				'<div class="footer">' +
					'<small>' +
						'<a href="https://www.reddit.com/user/' + c.author + '">' +
							c.author +
						'</a>' +
						' &middot; ' +
						'<a href="https://www.reddit.com/r/' + c.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/' + c.id + '" title="view/post replies">' +
							moment(new Date(c.created_utc * 1000)).fromNow() +
						'</a>' +
					'<small/>' +
				'</div>' +
			'</div>';
		}

		if (comments.length === 0) {
			html += '<div class="post"><p><em>There is no answer yet.</em></p></div>'
		}

		html += '<div class="post">' +
			'<h3>Do you know this song?</h3>' +
			'<input type="text" name="artist" id="input-artist" placeholder="Artist"><br>' +
			'<input type="text" name="title" id="input-title" placeholder="Title">'+
			'<button id="post-comment">Send answer</button>'+
		'</div>';

		$('#comments').html(html);

		$(document).on('click', '#post-comment', function (e) {
			var artist = $('#input-artist').val()
			var title = $('#input-title').val()
			var params = {
				api_type: "json",
				text: artist + ' - ' + title,
				thing_id: post.link_id
			}

			reddit2.auth(ACCESS_TOKEN).then(function() {
				return reddit2('/r/hummhumm/comments/'+postId).post(params)
			}).then(function(data) {
				console.log(data);
			});
		})
	});
})