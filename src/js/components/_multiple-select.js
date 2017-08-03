import { $DOCUMENT, OPEN } from '../_constants';

export default function() {

	$DOCUMENT.on('click', '[data-select-open]', function() {
		const $parent = $(this).closest('[data-select]');
		$parent.toggleClass(OPEN);
	});

	$DOCUMENT.on('click', function(e) {
		if ($(e.target).closest('[data-select]').length) return;
		$('[data-select]').removeClass(OPEN);
	});

};