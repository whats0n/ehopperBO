import {ACTIVE, FOCUS, smartClick} from '../_constants';

export default function() {
	const selectClassName = '.js-multi-select';
	const fieldClassName = '.js-multi-select-field';
	const itemClassName = '.js-multi-select-item';
	const valueClassName = '.js-multi-select-value';

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
		const text = $this.text();
		
		$select.removeClass(FOCUS);
		text.length && $select.addClass(ACTIVE);
		$value.text(text);
	});

	smartClick('body', function(e) {
		
		const $target = $(e.target);
		const $select = $target.closest(selectClassName);
		const $selects = $(selectClassName);
		if ($select.length || !$selects.hasClass(FOCUS)) return;
		$selects.removeClass(FOCUS);

	});

};