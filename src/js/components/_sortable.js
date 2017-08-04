import sortable from '../lib/jquery-ui.min';

export default function() {
	
	const sortableX = $('.js-sortable-x');
	const sortableY = $('.js-sortable-y');
	const sortable = $('.js-sortable');

	sortableX.length && sortableX.sortable({
		handle: '.js-sortable-handle',
		axis: 'x',
		containment: 'parent'
	});

	sortableY.length && sortableY.sortable({
		handle: '.js-sortable-handle',
		axis: 'y',
		containment: 'parent'
	});

	sortable.length && sortable.sortable({
		handle: '.js-sortable-handle',
		containment: 'parent'
	});

};