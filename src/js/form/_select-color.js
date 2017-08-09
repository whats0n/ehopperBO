import {ACTIVE, FOCUS, smartClick} from '../_constants';

export default function() {
	const selectClassName = '.js-select-color';
	const fieldClassName = '.js-select-color-field';
	const itemClassName = '.js-select-color-item';
	const valueClassName = '.js-select-color-value';

	smartClick(fieldClassName, function(e) {
		e.preventDefault();
		
		const $this = $(this);
		const $select = $this.closest(selectClassName);
		const $selects = $(selectClassName);
		
		if ($select.hasClass(FOCUS)) {
			$selects.removeClass(FOCUS);
		} else {
			$selects.removeClass(FOCUS);
			$select.addClass(FOCUS);
		}

	});

	smartClick(itemClassName, function(e) {
		e.preventDefault();
		
		const $this = $(this);
		const $select = $this.closest(selectClassName);
		const $value = $select.find(valueClassName);
		const color = $this.data('value');
		
		$select.removeClass(FOCUS);
		color.length && $select.addClass(ACTIVE);
		$value.css('background-color', color);
	});

	smartClick('body', function(e) {
		
		const $target = $(e.target);
		const $select = $target.closest(selectClassName);
		const $selects = $(selectClassName);
		if ($select.length || !$selects.hasClass(FOCUS)) return;
		$selects.removeClass(FOCUS);

	});

};