import {OPEN, $DOCUMENT, smartClick} from '../_constants';

export default function() {

	smartClick('[data-popup-open]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('popup-open');
		const $popup = $(`[data-popup="${name}"]`);
		const $wrapper = $(`[data-popup-wrapper*="${name}"]`);

		$wrapper.addClass(OPEN);
		$popup.addClass(OPEN);
	});

	smartClick('[data-popup-close]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('popup-close');
		const $popup = $(`[data-popup="${name}"]`);
		const $wrapper = $(`[data-popup-wrapper*="${name}"]`);

		$wrapper.removeClass(OPEN);
		$popup.removeClass(OPEN);
	});

	smartClick('html', function(e) {

		const $target = $(e.target);
		const $popup = $(`[data-popup]`);
		const $wrapper = $(`[data-popup-wrapper]`);

		if ($target.closest('[data-popup-container]').length || 
			$target.closest('[data-popup-open]').length ||
			!$popup.hasClass(OPEN)) return;

		$wrapper.removeClass(OPEN);
		$popup.removeClass(OPEN);
	});

};