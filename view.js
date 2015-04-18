function addPost() {
	$('#reddit').append(
		'<div class="post">marrant</div>'
	);
}

$('.post').on('click', function () {
	console.log("test");
	var win = window.open('https://www.reddit.com/r/HummHumm', '_blank');
	win.focus();
});

var blob = "";

// Audio capture button actions
$(document).ready(function() {
	$('#download').addClass('disabled');
	
	$(document).on('click', '#record:not(.disabled)', function() {
		$.voice.record(false, function() {
			$('#record').addClass('disabled');
			$('#stop, #download').removeClass('disabled');
			$('#humming-info').html('Recording...');
		});
	});
	
	$(document).on('click', '#stop:not(.disabled)', function() {
		$.voice.export(function(url){
			blob = url;
			$('#audio').attr('src', url);
			endRecord();
		}, 'URL');
	});
	
	$(document).on('click', '#download:not(.disabled)', function() {
		$.voice.export(function(url) {
			blob = url;
			$('<a href="'+url+'" download="Recording.wav"></a>')[0].click();
			endRecord();
		}, 'URL');
	});
});

function endRecord() {
	$.voice.stop();
	$('#record').removeClass('disabled');
	$('#download').addClass('disabled');
	$('#humming-info').html('<button id="upload">Upload</button>');
}

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
	}).done(function(data) {
		   console.log(data);
	});
});