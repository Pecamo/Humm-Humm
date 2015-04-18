function restore(){$("#record,#live").removeClass("disabled");$(".one").addClass("disabled");$.voice.stop();}
$(document).ready(function(){
	$(document).on("click", "#record:not(.disabled)", function(){
		elem = $(this);
		$.voice.record($("#live").is(":checked"), function(){
			elem.addClass("disabled");
			$("#live").addClass("disabled");
			$("#stop,#play,#download").removeClass("disabled");
			$('#humming-analysis').text('Recording...');
		});
	});
	$(document).on("click", "#stop:not(.disabled)", function(){
		$.voice.export(function(url){
			$("#audio").attr("src", url);
		}, "URL");
		restore();
		$('#humming-analysis').text('');
	});
	$(document).on("click", "#download:not(.disabled)", function(){
		$.voice.export(function(url){
			$("<a href='"+url+"' download='MyRecording.wav'></a>")[0].click();
		}, "URL");
		restore();
	});
});