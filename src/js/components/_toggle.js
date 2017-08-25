import { smartClick, ACTIVE, OPEN } from '../_constants';

export default function() {

	smartClick('.js-toggle-btn', function(e) {

		e.preventDefault();

		const $this = $(this);
		const target = $this.data('toggle');

		const $parent = $this.closest(`.js-toggle[data-toggle="${target}"]`);
		const $container = $parent.find(`.js-toggle-container[data-toggle="${target}"]`);

		$this.toggleClass(ACTIVE);
		$container.toggleClass(OPEN);

	});

};