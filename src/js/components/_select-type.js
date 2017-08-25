import { OPEN, $DOCUMENT } from '../_constants';

export default function() {

	const $selectType = $('.js-select-type');

	$selectType.each(function() {

		const $this = $(this);
		const $input = $this.find('.js-select-type-input');
		const $containers = $this.find('.js-select-type-container');

		$input.on('change', function() {
			if ($(this).data('select-type') === 'radio') $containers.addClass(OPEN);
			else $containers.removeClass(OPEN);
		});

	});

};