import resizable from '../lib/jquery-resizable';
import { HIDDEN, ACTIVE, ANIMATION, isTouch } from '../_constants';


export default function() {
	const container = $('.js-resizable-width');

	if (container.length) {

		const touchFlag = isTouch();

		container.each(function() {

			const $this = $(this);
			const $leftColumn = $this.find('.js-resizable-width-left');
			const $rightColumn = $this.find('.js-resizable-width-right');
			const $splitter = $this.find('.js-resizable-width-splitter');
			const $navBtn = $('.js-nav-btn');
			const $headerTitle = $('.js-header-title');
			const $slideBackBtn = $('.js-slide-back');


			const headerTitleThreshold = 100;
			let headerTitleOpacity = null;
			let headerTitleFlag = false;

			let slideBackBtnMargin = null;
			let slideBackBtnFlag = false;

			if (touchFlag) {
				$headerTitle
					.add($rightColumn)
					.addClass(ANIMATION);
				$splitter.on('click', e => {
					if ($splitter.hasClass(ACTIVE)) {
						$splitter.removeClass(ACTIVE);
						$headerTitle.removeClass(HIDDEN);
						$slideBackBtn
							.add($rightColumn)
							.removeAttr('style');
					} else {
						$splitter.addClass(ACTIVE);
						$headerTitle.addClass(HIDDEN);
						$slideBackBtn.css('margin-left', $navBtn.outerWidth());
						$rightColumn.css('width', '100%');
					}
				});
			} else {
				$rightColumn.resizable({
					resizeHeight: false,
					handleSelector: '> .js-resizable-width-splitter',
					resizeWidthFrom: 'left',
					onDrag(event, $column, newWidth, newHeight, options) {
						const rowWidth = $this.innerWidth();
						const leftColumnWidth = `${rowWidth - newWidth}px`;

						if ($headerTitle.length) {
							const headerTitleWidth = $headerTitle.outerWidth();
							const path = (headerTitleWidth - (rowWidth - newWidth));

							if (rowWidth - newWidth < headerTitleWidth ) {
								if (path <= headerTitleThreshold) {
									headerTitleFlag = true;
									headerTitleOpacity = (1 - (path / 100)).toFixed(2);
									$headerTitle.css('opacity', headerTitleOpacity);
								} else if (path > headerTitleThreshold && headerTitleOpacity != 0) {
									headerTitleFlag = false;
									headerTitleOpacity = 0;
									$headerTitle.css('opacity', headerTitleOpacity);
								}
							} 

							if (rowWidth - newWidth >= headerTitleWidth) {
								if (!headerTitleFlag && headerTitleOpacity != 1) {
									headerTitleFlag = true;
								}
								headerTitleOpacity = 1;
							}

							if (headerTitleFlag) {
								$headerTitle.css('opacity', headerTitleOpacity);
								headerTitleFlag = false;
							}
						}

						if ($navBtn.length && $slideBackBtn.length) {
							const navBtnWidth = $navBtn.outerWidth();
							
							if (rowWidth - newWidth <= navBtnWidth) {
								const path = navBtnWidth - (rowWidth - newWidth);
								slideBackBtnMargin = path < navBtnWidth ? path : navBtnWidth;
								slideBackBtnFlag = true;
							} else {
								if (!slideBackBtnFlag && slideBackBtnMargin != 0) {
									slideBackBtnFlag = true;
								}
								slideBackBtnMargin = 0;
							}

							if (slideBackBtnFlag) {
								$slideBackBtn.css('margin-left', slideBackBtnMargin);
								slideBackBtnFlag = false;
							};
						};
						
						$leftColumn.width(leftColumnWidth);
					},
					onDragEnd(event, $column, options) {
						const rowWidth = $this.innerWidth();
						const rightColumnWidth = `${$rightColumn.outerWidth() / rowWidth * 100}%`;
						const leftColumnWidth = `${$leftColumn.outerWidth() / rowWidth * 100}%`;
						const navBtnWidth = $navBtn.outerWidth();

						$rightColumn.width(rightColumnWidth);
						$leftColumn.width(leftColumnWidth);
					}
				});
			}
			
		});

	}

};