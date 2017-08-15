import resizable from '../lib/jquery-resizable';

export default function() {
	const container = $('.js-resizable-width');

	if (container.length) {

		container.each(function() {

			const $this = $(this);
			const $leftColumn = $this.find('.js-resizable-width-left');
			const $rightColumn = $this.find('.js-resizable-width-right');
			const $splitter = $this.find('.js-resizable-width-splitter');
			const $navBtn = $('.js-nav-btn');

			$rightColumn.resizable({
				resizeHeight: false,
				handleSelector: '> .js-resizable-width-splitter',
				resizeWidthFrom: 'left',
				onDrag(event, $column, newWidth, newHeight, options) {
					const rowWidth = $this.innerWidth();
					const leftColumnWidth = `${rowWidth - newWidth}px`;
					const navBtnWidth = $navBtn.outerWidth();
					
					$rightColumn.css('max-width', `calc(100% - ${navBtnWidth}px)`);
					$leftColumn.width(leftColumnWidth);
				},
				onDragEnd(event, $column, options) {
					const rowWidth = $this.innerWidth();
					const rightColumnWidth = `${$rightColumn.outerWidth() / rowWidth * 100}%`;
					const leftColumnWidth = `${$leftColumn.outerWidth() / rowWidth * 100}%`;
					const navBtnWidth = $navBtn.outerWidth();

					$rightColumn.css('max-width', `calc(100% - ${navBtnWidth}px)`);
					$rightColumn.width(rightColumnWidth);
					$leftColumn.width(leftColumnWidth);
				}
			});
			
		});

	}

};