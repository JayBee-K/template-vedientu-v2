;(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	const handleTouchMoveNavigation = (ev) => {
		if (!$(ev.target).closest('').length) {
			ev.preventDefault();
		}
	}


	$(function () {
	});
})(jQuery);