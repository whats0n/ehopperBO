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
			//1. find scrollable parent and his offset top and bottom
			//2. hide all other containers and show current
			//3. find current dropdown and his offset top and bottom
			//4. compare: if dropdown is not in visible zone - move it into this zone
			const $scrollableParent = $this.scrollParent();
			const scrollable = $scrollableParent.get(0).tagName;
			
			$selects.removeClass(FOCUS);
			$select.addClass(FOCUS);

			if (!scrollable) return;

			const parentOffsetTop = $scrollableParent.offset().top;
			const parentHeight = $scrollableParent.outerHeight();
			const parentOffsetBottom = parentOffsetTop + parentHeight;

			const $dropdown = $select.find(dropdownClassName);

			const dropdownOffsetTop = $dropdown.offset().top;
			const dropdownHeight = $dropdown.outerHeight();
			const dropdownOffsetBottom = dropdownOffsetTop + dropdownHeight;

			const selectOffsetTop = $select.offset().top;
			
			if (parentOffsetBottom <= dropdownOffsetBottom && parentOffsetTop <= selectOffsetTop - dropdownHeight) {
				$selects.addClass('select_top');
			}
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
		$select.removeClass('select_top');
	});

	smartClick('body', function(e) {
		
		const $target = $(e.target);
		const $select = $target.closest(selectClassName);
		const $selects = $(selectClassName);
		if ($select.length || !$selects.hasClass(FOCUS)) return;
		$selects.removeClass(FOCUS);
		$select.removeClass('select_top');

	});

};