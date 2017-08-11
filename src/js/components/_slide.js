import {OPEN, $DOCUMENT, smartClick} from '../_constants';

export default function() {

	smartClick('[data-slide-open]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('slide-open');
		const $slide = $(`[data-slide="${name}"]`);

		$slide.addClass(OPEN);
	});

	smartClick('[data-slide-close]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('slide-close');
		const $slide = $(`[data-slide="${name}"]`);

		$slide.removeClass(OPEN);
	});

};