import sortable from '../lib/jquery-ui.min';

export default function() {
	
	const sortableX = $('.js-sortable-x');
	const sortableY = $('.js-sortable-y');
	const sortable = $('.js-sortable');

	if (sortableX.length) {
		sortableX.sortable({
			handle: '.js-sortable-handle',
			axis: 'x',
			placeholder: 'sortable-placeholder'
		});
	}

	if (sortableY.length) {
		sortableY.sortable({
			handle: '.js-sortable-handle',
			axis: 'y',
			placeholder: 'sortable-placeholder'
		});
	}

	if (sortable.length) {
		sortable.sortable({
			handle: '.js-sortable-handle',
			placeholder: 'sortable-placeholder'
		});
	}

};