import resizable from '../lib/jquery-resizable';

export default function() {
	const container = $('.js-resizable-width');

	if (container.length) {

		container.each(function() {

			const $this = $(this);
			const $leftColumn = $this.find('.js-resizable-width-left');
			const $rightColumn = $this.find('.js-resizable-width-right');
			const $splitter = $this.find('.js-resizable-width-splitter');

			$rightColumn.resizable({
				resizeHeight: false,
				handleSelector: '> .js-resizable-width-splitter',
				resizeWidthFrom: 'left',
				onDrag(event, $column, newWidth, newHeight, options) {
					const rowWidth = $this.innerWidth();
					const siblingColumnWidth = `${rowWidth - newWidth}px`;
					$leftColumn.width(siblingColumnWidth);
				}
			});
		});

	}

};