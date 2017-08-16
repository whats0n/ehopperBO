import resizable from '../lib/jquery-resizable';
import { HIDDEN } from '../_constants';


export default function() {
	const container = $('.js-resizable-width');

	if (container.length) {

		container.each(function() {

			const $this = $(this);
			const $leftColumn = $this.find('.js-resizable-width-left');
			const $rightColumn = $this.find('.js-resizable-width-right');
			const $splitter = $this.find('.js-resizable-width-splitter');
			const $navBtn = $('.js-nav-btn');
			const $headerTitle = $('.js-header-title');
			const headerTitleThreshold = 100;

			let opacity = null;
			let headerTitleFlag = false;

			const hideHeaderTitle = () => { $headerTitle.addClass(HIDDEN) };
			const showHeaderTitle = () => { $headerTitle.removeClass(HIDDEN) };

			$rightColumn.resizable({
				resizeHeight: false,
				handleSelector: '> .js-resizable-width-splitter',
				resizeWidthFrom: 'left',
				onDrag(event, $column, newWidth, newHeight, options) {
					const rowWidth = $this.innerWidth();
					const leftColumnWidth = `${rowWidth - newWidth}px`;
					const navBtnWidth = $navBtn.outerWidth();

					if ($headerTitle.length) {
						const headerTitleWidth = $headerTitle.outerWidth();

						// if (rowWidth - newWidth < headerTitleWidth) hideHeaderTitle();
						// else showHeaderTitle();
						const path = (headerTitleWidth - (rowWidth - newWidth));

						if (rowWidth - newWidth < headerTitleWidth ) {
							if (path <= headerTitleThreshold) {
								headerTitleFlag = true;
								opacity = (1 - (path / 100)).toFixed(2);
								$headerTitle.css('opacity', opacity);
							} else if (path > headerTitleThreshold && opacity != 0) {
								headerTitleFlag = false;
								opacity = 0;
								$headerTitle.css('opacity', opacity);
							}

						} 

						if (rowWidth - newWidth >= headerTitleWidth) {
							if (!headerTitleFlag && opacity != 1) {
								headerTitleFlag = true;
							}
							opacity = 1;
						}

						if (headerTitleFlag) {
							$headerTitle.css('opacity', opacity);
							headerTitleFlag = false;
							console.log('resize');
						}
					}
					
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