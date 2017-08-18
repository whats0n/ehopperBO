import {$DOCUMENT, $BODY, isTouch, touchClass, noTouchClass} from './_constants';

export default (function() {
	$DOCUMENT.ready(function() {
		const touch = isTouch();
		touch && $BODY.addClass(touchClass);
		!touch && $BODY.addClass(noTouchClass);
		if (touch) {
			$BODY.css('min-height', $BODY.outerHeight());
			$(window).on('resize', () => {
				$BODY.css('min-height', 1);
				$BODY.css('min-height', $BODY.outerHeight());
			});
		} 
	});
})();