import {$DOCUMENT, $BODY, OPEN, ACTIVE, smartClick} from '../_constants';

export default function() {

	smartClick('[data-tab-open]', function(e) {
		e.preventDefault();
		const $currentButton = $(this);
		if ($currentButton.hasClass(ACTIVE)) return;

		const targetName = $currentButton.data('tab-open');
		const collectionName = $currentButton.data('tab-collection');

		const $collectionItems = $(`[data-tab-collection="${collectionName}"]`);
		const $collectionButtons = $collectionItems.filter('[data-tab-open]');
		const $collectionContainers = $collectionItems.filter(`[data-tab-container]`);
		const $currentContainer = $collectionContainers.filter(`[data-tab-container="${targetName}"]`);

		$collectionButtons.removeClass(ACTIVE);
		$collectionContainers.removeClass(OPEN);

		$currentButton.addClass(ACTIVE);
		$currentContainer.addClass(OPEN);
	});

};