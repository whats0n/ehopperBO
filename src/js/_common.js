import {$DOCUMENT, $BODY, isTouch, touchClass, noTouchClass} from './_constants';

export default (function() {
	$DOCUMENT.ready(function() {
		const touch = isTouch();
		touch && $BODY.addClass(touchClass);
		!touch && $BODY.addClass(noTouchClass);
		
		if (touch) {
			const windowHeight = window.outerHeight;
			const screenHeight = window.screen.height;
			const barsHeight = screenHeight - windowHeight;

			window.addEventListener('orientationchange', (e) => {
				const currentHeight = screen.height - barsHeight;
				$BODY.css('min-height', currentHeight);
			});
		} 
	});
})();