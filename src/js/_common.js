import {$DOCUMENT, $BODY, isTouch, touchClass, noTouchClass} from './_constants';

export default (function() {
	$DOCUMENT.ready(function() {
		const touch = isTouch();
		touch && $BODY.addClass(touchClass);
		!touch && $BODY.addClass(noTouchClass);
		if (touch) {
			const width = window.outerWidth;
			const height = window.outerHiehgt;
			const screenWidth = window.screen.width;
			const screenHeight = window.screen.height;
			const barsHeight = screenHeight - height;
			const PORTRAIT = 'portrait';
			const LANDSCAPE = 'landscape';

			//alert(screenWidth);
			//alert(screenHeight);
			//$BODY.css('min-height', $BODY.outerHeight());

			window.addEventListener('orientationchange', (e) => {
				const angle = screen.orientation.angle;
				let orientation = null;
				console.log(screen.orientation);
				if (angle === 0 || angle === 180) orientation = LANDSCAPE;
				if (angle === 90 || angle === 270) orientation = PORTRAIT;

				switch(orientation) {
					case PORTRAIT:
						//$BODY.css('min-height', )
						break;
					case LANDSCAPE: 
						break;
				}

				//$BODY.css('min-height', 1);
				//setTimeout(() => {
				//	$BODY.css('min-height', $BODY.outerHeight());
				//}, 1000);
				//alert(orientation);
			});
		} 
	});
})();