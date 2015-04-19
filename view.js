var Snoocore = window.Snoocore;
var hash = window.location.hash;

var reddit = new Snoocore({
	userAgent: 'HummHumm Web',
	oauth: {
		type: 'implicit',
		consumerKey: 'qVjwB7K3EUJBBg',
		redirectUri: "http://loki.cpfk.net:31415",
		scope: [ 'identity', 'vote', 'submit', 'read' ],
		expires_in: 7200,
		duration: 'permanent'
	}
});

$(function() {
	$('#captcha').hide();
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
				'<audio controls preload autoplay load><source src="' + p.url + '" type="audio/wav"></audio>' +
				'<div class="footer">' +
					'<small class="footer">' +
						'<a href="https://www.reddit.com/user/' + p.author + '">' +
							p.author +
						'</a>' +
						' &middot; ' +
						'<a href="https://www.reddit.com/r/' + p.subreddit + '/comments/' + p.id + '/fuck_your_wrong_console_code/" title="view/post replies">' +
							moment(new Date(p.created_utc * 1000)).fromNow() +
						'</a>' +
						' &middot; ' +
						'<a href="https://www.reddit.com/r/' + p.subreddit + '/comments/' + p.id + '/fuck_your_wrong_console_code/" title="view/post replies">' +
							p.num_comments + ' commentaire' + (p.num_comments > 1 ? 's' : '') +
						'</a>' +
					'</small>' +
				'</div>' +
			'</div>';
		}

		$('#posts').html(html)
	});
});

var globlob = "";
var globurl = "";
var startRecTime;
var interval;

// Audio capture button actions
$(document).on('click', '#record:not(.disabled)', function () {
	$.voice.record(false, function () {
		$('#record, #download').addClass('disabled');
		$('#stop').removeClass('disabled');

		var html = 'Recording...';
		startRecTime = new Date();

		interval = setInterval(function () {
		var html = 'Recording...<br>';
			html += Math.floor((new Date() - startRecTime) / 1000) + ' seconds';
			$('#humming-info').html(html);
		}, 200);

		$('#humming-info').html(html);
	});
});

$(document).on('click', '#stop:not(.disabled)', function () {
	$.voice.export(function (blob) {
		globlob = blob;
		globurl = URL.createObjectURL(blob)
		$.voice.stop();
		clearInterval(interval);
		
		$('#audio').attr('src', globurl);
		$('#download').removeClass('disabled');
		$('#record').removeClass('disabled');
		$('#stop').addClass('disabled');
		$('#humming-info').html(
			'<p id="upload-info">Clicking the button will create a post on /r/HummHumm with your recorded voice.</p>' +
			'<input maxlength="300" type="text" id="input-title" name="input-title" placeholder="Add tags like [Metal][Rock]"/>' + 
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
	var title = $("#input-title").val();
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
		console.log(title);
		postLink("http://loki.cpfk.net:31415"+data, title);
	});

});

$(document).on('click', '#login-button:not(.disabled)', function() {
	login();
});

// Check if we have an access token in the hash, if so
// we can authenticate with reddit and make our call!
var match = ('' + window.location.hash).match(/access_token=(.*?)&/);
var accessToken = match ? match[1] : '';

function showCaptcha(link, titleText, iden) {
	$('#captcha').show();
	$('#captcha:not(:has(#captcha-img))').append(
		'<p>Please enter what you see :</p>' +
		'<img id="captcha-img" src="' + "https://www.reddit.com/captcha/" + iden + '"></img>' +
		'<div>' +
			'<input type="text" id="captcha-input"></input>' +
			'<button type="submit" id="captcha-submit">Submit</button>' +
		'</div>'
	);

	$(document).off('click', '#captcha-submit');

	$(document).on('click', '#captcha-submit', function () {
		console.log('---------')
		var captchaCode = $("#captcha-input").val();
		$("#captcha").hide();
		console.log('postLink()', link, titleText, iden, captchaCode);
		postLink(link, titleText, iden, captchaCode);
	});
}


function addPost() {
	$('#reddit').append(
		'<div class="post">marrant</div>'
	);
}
