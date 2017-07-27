import {OPEN, $DOCUMENT, smartClick} from '../_constants';

export default (function() {

	smartClick('[data-modal-open]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('modal-open');
		const $modal = $(`[data-modal="${name}"]`);

		$modal.addClass(OPEN);
	});

	smartClick('[data-modal-close]', e => {
		e.preventDefault();

		const $target = $(e.currentTarget);
		const name = $target.data('modal-close');
		const $modal = $(`[data-modal="${name}"]`);

		$modal.removeClass(OPEN);
	});

	smartClick('html', function(e) {

		const $target = $(e.target);
		const $modal = $target.closest('[data-modal]');

		if ($target.closest('[data-modal-container]').length || 
			$target.closest('[data-modal-target]').length ||
			!$modal.hasClass(OPEN)) return;

		$modal.removeClass(OPEN);
	});

})();