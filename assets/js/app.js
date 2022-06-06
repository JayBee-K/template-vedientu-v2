;(function ($) {
    'use strict';
    let windowWidth = $(window).width();

    const handleTouchMoveNavigation = (ev) => {
        if (!$(ev.target).closest('').length) {
            ev.preventDefault();
        }
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
            quantityDefault = $('.quantity-pasenger');

        buttonQuantity.click(function () {
            let type = $(this).attr('data-type'),
                typePeople = $(this).attr('data-people'),
                elmValuePeople = $(`.count-${typePeople}`);

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

            $('.count-passengers').html(parseInt(quantityDefault.val()));
        });
    }

    const altFormat = "l, d F Y";

    const checkInFlatpickrConfig = {
        defaultDate: [Date.now()],
        mode: "single",
        locale: "vn",
        altInput: true,
        altFormat: altFormat,
        minDate: "today",
        onOpen: function () {
            dateCheckInFlatpickr.set('positionElement', $(".input-checkin")[0]);
            dateCheckInFlatpickr.set("mode", "single");
        },
        onChange: function (selectedDates) {
            $('.trigger-flatpickr[data-type="checkin"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
            $('.trigger-flatpickr[data-type="checkin"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
            $('.trigger-flatpickr[data-type="checkin"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
        },
    };

    const checkOutFlatpickrConfig = {
        defaultDate: [Date.now()],
        mode: "single",
        locale: "vn",
        altInput: true,
        altFormat: altFormat,
        minDate: "today",
        onOpen: function () {
            dateCheckInFlatpickr.set('positionElement', $(".input-checkout")[0]);
            dateCheckOutFlatpickr.set("mode", "single");
        },
        onChange: function (selectedDates) {
            $('.trigger-flatpickr[data-type="checkout"] .return-text').html(moment(selectedDates[0]).locale('vi').format("dddd"));
            $('.trigger-flatpickr[data-type="checkout"] .return-day').html(moment(selectedDates[0]).locale('vi').format("DD"));
            $('.trigger-flatpickr[data-type="checkout"] .return-month').html(moment(selectedDates[0]).locale('vi').format("MM"));
        },
    };
    let dateCheckInFlatpickr = $(".input-checkin").flatpickr(checkInFlatpickrConfig);
    let dateCheckOutFlatpickr = $(".input-checkout").flatpickr(checkOutFlatpickrConfig);

    $(function () {
        handleSetHeightBanner();
        handleInitLocation();
        handleInitDropdownQuantity();

        $(document).on('click', '.trigger-flatpickr', function () {
            if ($(this).attr('data-type') == 'checkin') {
                dateCheckInFlatpickr.open();
            } else {
                dateCheckOutFlatpickr.open();
            }
        })

    });
})(jQuery);