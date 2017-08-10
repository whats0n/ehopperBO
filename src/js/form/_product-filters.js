import {ACTIVE, FOCUS, smartClick, $DOCUMENT} from '../_constants';

export default function() {

	const reset = {
		multiSelect($select) {
			if (!$select.length) return;

			const $showAll = $select.find('.js-multi-select-all input');
			if ($showAll.prop('checked')) return;

			$showAll
				.prop('checked', true)
				.trigger('change');
		},
		select($select) {
			if (!$select.length) return;

			const text = $select
				.find('.js-select-item')
				.eq(0)
				.text();

			$select
				.find('.js-select-value')
				.text(text);
		}
	};
	
	smartClick('.js-product-filters-reset', function(e) {
		e.preventDefault();
		const $filters = $('.js-product-filters');
		const $select = $filters.find('.js-select');
		const $multiSelect = $filters.find('.js-multi-select');

		reset.select($select);
		reset.multiSelect($multiSelect);
	});

};