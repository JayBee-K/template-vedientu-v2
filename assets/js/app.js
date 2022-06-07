;(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	const handleTouchMoveNavigation = (ev) => {
		if (!$(ev.target).closest('').length) {
			ev.preventDefault();
		}
	}

	/****
	 * Handle Scroll Header
	 */
	const handleHeaderScroll = function (e) {
		$(window).scroll(function (e) {
			if ($(document).scrollTop() > $('#header').innerHeight()) {
				$('#header').addClass('is-scroll').removeClass('no-scroll');
			} else {
				$('#header').removeClass('is-scroll').addClass('no-scroll');
			}
		});
	}

	const handleSetHeightBanner = function () {
		if ($('#section-hero').length) {
			const heightHeader = $('#header').innerHeight();
			$('#section-hero').css('max-height', `calc(100vh - ${heightHeader}px)`);
		}
	}

	const handleInitLocation = function () {
		if ($('.init-location').length) {
			$('.init-location').each(function () {
				let elm = $(this),
					elmWrap = elm.closest('.form-field_item');
				elm.select2({
					dropdownParent: elmWrap,
					placeholder: "Chọn địa điểm",
					width: 'calc(100% - 1px)',
					closeOnSelect: false,
					templateResult: renderOptionLocation,
				}).one('select2:open', function (e) {
					elmWrap.find('input.select2-search__field').prop('placeholder', 'Nhập địa điểm cần tìm');
				});
			});

			$(document).on('mouseup', function (e) {
				var o = $(".form-field_item[data-select2-id]");
				o.is(e.target) || 0 !== o.has(e.target).length || (
					o.find('.init-location').select2('close'));
			});
		}
	}

	function renderOptionLocation(state) {
		if (!state.id) {
			return state.text;
		} else {
			return $(`<div class="option-select_item">
                                    <div class="option-select_item__title">${state.title.split("|")[0]}</div>
                                    <div class="option-select_item__desc">${state.title.split("|")[1]}</div>
                            </div>`);
		}
	}

	const handleInitDropdownQuantity = function () {
		if ($('.form-field_dropdown__hidden').length) {
			$('.form-field_dropdown__hidden').each(function () {
				let elm = $(this),
					elmWrap = elm.closest('.form-field_item'),
					elmWrapDropdown = elmWrap.find('.form-field_dropdown');
				elmWrapDropdown.click(function () {
					if (elmWrap.hasClass('is-show')) {
						elmWrap.removeClass('is-show');
					} else {
						elmWrap.addClass('is-show');
					}
				});

				$(document).on('mouseup', function (e) {
					elm.is(e.target) || 0 !== elm.has(e.target).length || (
						elmWrap.removeClass('is-show'));
				});

				handleQuantityPassenger(elm);
			});
		}
	}

	const handleQuantityPassenger = function (elm) {
		let buttonQuantity = elm.find('.button-quantity'),
			quantityDefault = elm.closest('.form-field_item').find('.quantity-pasenger');

		buttonQuantity.click(function () {
			let type = $(this).attr('data-type'),
				typePeople = $(this).attr('data-people'),
				elmValuePeople = $(this).closest('.form-field_item').find(`.count-${typePeople}`);

			if (type == 1) {
				elmValuePeople.html(parseInt(elmValuePeople.html()) + 1);
				quantityDefault.val(parseInt(quantityDefault.val()) + 1);
			} else {
				if (parseInt(elmValuePeople.html()) == 0) {
					return false;
				} else {
					elmValuePeople.html(parseInt(elmValuePeople.html()) - 1);
					quantityDefault.val(parseInt(quantityDefault.val()) - 1);
				}
			}

			elm.closest('.form-field_item').find('.count-passengers').html(parseInt(quantityDefault.val()));
		});
	}

	const altFormat = "l, d F Y";

	const kh_checkInFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			kh_dateCheckInFlatpickr.set('positionElement', $(".input-checkin")[0]);
			kh_dateCheckInFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="kh_checkin"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="kh_checkin"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="kh_checkin"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};

	const kh_checkOutFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			kh_dateCheckInFlatpickr.set('positionElement', $(".input-checkout")[0]);
			kh_dateCheckOutFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="kh_checkout"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="kh_checkout"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="kh_checkout"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};

	const mc_checkInFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			mc_dateCheckInFlatpickr.set('positionElement', $(".input-checkin")[0]);
			mc_dateCheckInFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="mc_checkin"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="mc_checkin"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="mc_checkin"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};

	const mc_checkOutFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			mc_dateCheckInFlatpickr.set('positionElement', $(".input-checkout")[0]);
			mc_dateCheckOutFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="mc_checkout"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="mc_checkout"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="mc_checkout"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};

	const header_checkInFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			header_dateCheckInFlatpickr.set('positionElement', $(".input-checkin")[0]);
			header_dateCheckInFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="header_checkin"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="header_checkin"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="header_checkin"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};

	const header_checkOutFlatpickrConfig = {
		defaultDate: [Date.now()],
		mode: "single",
		locale: "vn",
		altInput: true,
		altFormat: altFormat,
		minDate: "today",
		onOpen: function () {
			header_dateCheckInFlatpickr.set('positionElement', $(".input-checkout")[0]);
			header_dateCheckOutFlatpickr.set("mode", "single");
		},
		onChange: function (selectedDates) {
			$('.trigger-flatpickr[data-type="header_checkout"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
			$('.trigger-flatpickr[data-type="header_checkout"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
			$('.trigger-flatpickr[data-type="header_checkout"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
		},
	};


	let kh_dateCheckInFlatpickr = $(".input-checkin_kh").flatpickr(kh_checkInFlatpickrConfig);
	let kh_dateCheckOutFlatpickr = $(".input-checkout_kh").flatpickr(kh_checkOutFlatpickrConfig);
	let mc_dateCheckInFlatpickr = $(".input-checkin_mc").flatpickr(mc_checkInFlatpickrConfig);
	let mc_dateCheckOutFlatpickr = $(".input-checkout_mc").flatpickr(mc_checkOutFlatpickrConfig);
	let header_dateCheckInFlatpickr = $(".input-checkin_header").flatpickr(header_checkInFlatpickrConfig);
	let header_dateCheckOutFlatpickr = $(".input-checkout_header").flatpickr(header_checkOutFlatpickrConfig);

	$(function () {
		handleHeaderScroll();

		handleSetHeightBanner();
		handleInitLocation();
		handleInitDropdownQuantity();

		$(document).on('click', '.trigger-flatpickr', function () {
			let type = $(this).attr('data-type');
			if (type == 'kh_checkin') {
				kh_dateCheckInFlatpickr.open();
			} else if (type == 'kh_checkout') {
				kh_dateCheckOutFlatpickr.open();
			} else if (type == 'mc_checkin') {
				mc_dateCheckInFlatpickr.open();
			} else if (type == 'mc_checkout') {
				mc_dateCheckOutFlatpickr.open();
			} else if (type == 'header_checkin') {
				header_dateCheckInFlatpickr.open();
			} else if (type == 'header_checkout') {
				header_dateCheckOutFlatpickr.open();
			}
		})

	});
})(jQuery);