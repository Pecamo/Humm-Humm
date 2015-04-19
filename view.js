$(function() {
	$('#download').addClass('disabled');

	if (accessToken) {
		localStorage.setItem('accessToken', accessToken);
		$("#login").hide();
	}
});

var blob = "";

// Audio capture button actions
$(document).on('click', '#record:not(.disabled)', function () {
	$.voice.record(false, function () {
		$('#record, #download').addClass('disabled');
		$('#stop').removeClass('disabled');
		$('#humming-info').html('Recording...');
	});
});

$(document).on('click', '#stop:not(.disabled)', function () {
	$.voice.export(function (url) {
		blob = url;
		$.voice.stop();
		
		$('#audio').attr('src', url);
		$('#download').removeClass('disabled');
		$('#record').removeClass('disabled');
		$('#stop').addClass('disabled');
		$('#humming-info').html(
			'<p id="upload-info">Clicking the button will create a post on /r/HummHumm with your recorded voice.</p>' +
			'<button id="upload">Create a post</button>' +
			'</div>'
		);
	}, 'URL');
});

$(document).on('click', '#download:not(.disabled)', function () {
	$('<a href="'+blob+'" download="Recording.wav"></a>')[0].click();
});

$(document).on('click', '#upload', function () {
	console.log(blob);
	var fd = new FormData();
	fd.append('fname', 'upload.wav');
	fd.append('data', blob);
	
	$.ajax({
		type: 'POST',
		url: '/sound',
		data: fd,
		processData: false,
		contentType: false
	}).done(function (data) {
		console.log(data);
	});
});

$(document).on('click', '.post', function () {
	console.log("test");
	var win = window.open('https://www.reddit.com/r/HummHumm', '_blank');
	win.focus();
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
