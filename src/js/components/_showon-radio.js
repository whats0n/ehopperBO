import { OPEN, $DOCUMENT } from '../_constants';

export default function() {

	const $showOnRadio = $('[data-showon-radio]');

	$showOnRadio.each(function() {

		const $this = $(this);
		const collectionName = $this.data('showon-radio');
		const targetName = $this.data('showon-radio-name');

		const $collection = $(`[data-showon-radio-item*="${collectionName}"]`);
		const $target = $collection.filter(`[data-showon-radio-name*="${targetName}"]`);

		$this.on('change', function() {
			$collection.removeClass(OPEN);
			$target.addClass(OPEN);
		});

	});

};