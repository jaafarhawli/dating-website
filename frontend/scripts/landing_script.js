$(document).ready(function() {
	$(window).scroll(function(event) {
		let scroll = $(this).scrollTop();
		let opacity = 1 - scroll / 500;
		if (opacity >= 0) {
			$('#heroHeader').css('opacity', opacity);
		}
	});
});
