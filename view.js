var Snoocore = window.Snoocore;
var hash = window.location.hash;

var reddit = new Snoocore({
	userAgent: 'HummHumm Web',
	oauth: {
		type: 'implicit',
		consumerKey: 'qVjwB7K3EUJBBg',
		redirectUri: "http://localhost:31415",
		scope: [ 'identity', 'vote', 'submit', 'read' ],
		expires_in: 7200
	}
});

$(function() {
	$('#download').addClass('disabled');

	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);
		$("#login").hide();
	}

	reddit.auth(accessToken).then(function() {
		return reddit('/r/hummhumm/hot').get()
	}).then(function(data) {
		console.log(data)
		var posts = data.data.children

		// var html = '<a href="https://www.reddit.com/r/' + post.subreddit + '/comments/' + postId + '/fuck_your_wrong_console_code/">View Post on /r/HummHumm</a>';

		// $('#audio').html('<audio controls preload autoplay load><source src="' + post.url + '" type="audio/wav"></audio>')

		var html = ''

		for (var i = 0, l = posts.length; i < l; i++) {
			var p = posts[i].data;

			html +=
			'<div class="post">' +
				'<h3 class="title">' +
					'<a href="/post.html?' + p.id + '">' +
						p.title +
					'</a>' +
				'</h3>' +
				'<div class="footer">' +
					'<a href="https://www.reddit.com/user/' + p.author + '">' +
						p.author +
					'</a>' +
					' &middot; ' +
					'<a href="https://www.reddit.com/r/' + p.subreddit + '/comments/' + p.id + '/fuck_your_wrong_console_code/" title="view/post replies">' +
						moment(new Date(p.created_utc * 1000)).fromNow() +
					'</a>' +
				'</div>' +
			'</div>';
		}

		$('#posts').html(html)
	});
});

var globlob = "";
var globurl = "";

// Audio capture button actions
$(document).on('click', '#record:not(.disabled)', function () {
	$.voice.record(false, function () {
		$('#record, #download').addClass('disabled');
		$('#stop').removeClass('disabled');
		$('#humming-info').html('Recording...');
	});
});

$(document).on('click', '#stop:not(.disabled)', function () {
	$.voice.export(function (blob) {
		globlob = blob;
		globurl = URL.createObjectURL(blob)
		$.voice.stop();
		
		$('#audio').attr('src', globurl);
		$('#download').removeClass('disabled');
		$('#record').removeClass('disabled');
		$('#stop').addClass('disabled');
		$('#humming-info').html(
			'<p id="upload-info">Clicking the button will create a post on /r/HummHumm with your recorded voice.</p>' +
			'<button id="upload">Create a post</button>' +
			'</div>'
		);
	}, 'blob');
});

$(document).on('click', '#download:not(.disabled)', function () {
	$('<a href="'+globurl+'" download="Recording.wav"></a>')[0].click();
});

$(document).on('click', '#upload', function () {
	//console.log(blob);
	var fd = new FormData();
	fd.append('fname', 'upload.wav');
	fd.append('data', globlob);
	
	$.ajax({
		type: 'POST',
		url: '/sounds',
		data: fd,
		processData: false,
		contentType: false
	}).done(function (data) {
		console.log(data);
		postLink(data, "Trop du test");
	});
});

$(document).on('click', '#login-button:not(.disabled)', function() {
	login();
});

// Check if we have an access token in the hash, if so
// we can authenticate with reddit and make our call!
var match = ('' + window.location.hash).match(/access_token=(.*?)&/);
var accessToken = match ? match[1] : '';

function addPost() {
	$('#reddit').append(
		'<div class="post">marrant</div>'
	);
}
