import { smartClick, ACTIVE, OPEN } from '../_constants';

export default function() {

	smartClick('.js-toggle-btn', function(e) {

		e.preventDefault();

		const $this = $(this);
		const target = $this.data('toggle');

		const $parent = $this.closest(`.js-toggle[data-toggle="${target}"]`);
		const $container = $parent.find(`.js-toggle-container[data-toggle="${target}"]`);
		const $scrollableParent = $this.scrollParent();

		$this.toggleClass(ACTIVE);
		$container.toggleClass(OPEN);

		if ($this.hasClass(ACTIVE)) {
			const containerOffsetTop = $container.offset().top - $scrollableParent.offset().top + $scrollableParent.scrollTop();
			$scrollableParent.animate({
				scrollTop: containerOffsetTop
			}, 500);
		}

	});

};