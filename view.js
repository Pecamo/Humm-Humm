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