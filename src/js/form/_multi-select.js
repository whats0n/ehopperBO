import {ACTIVE, FOCUS, smartClick, $DOCUMENT} from '../_constants';

export default function() {

	let called = false;

	class MultiSelect {
		constructor(props) {
			this.props = props;

			this.toggleOnFieldClick = this.toggleOnFieldClick.bind(this);
			this.closeOnBodyClick = this.closeOnBodyClick.bind(this);
			this.selectItem = this.selectItem.bind(this);
			this.selectAll = this.selectAll.bind(this);
			this.getSelect = this.getSelect.bind(this);
			this.setTextValue = this.setTextValue.bind(this);

			this.setInitialValues();
			this.addHandlers();
		}
		addHandlers() {
			//check if it's not first call - do not add handlers
			if (called) return;
			called = !called;

			smartClick(this.props.field, this.toggleOnFieldClick);
			smartClick('body', this.closeOnBodyClick);
			$DOCUMENT.on('change', `${this.props.item} input`, this.selectItem);
			$DOCUMENT.on('change', `${this.props.selectAll} input`, this.selectAll);
		}
		getSelect($el) {
			return {
				current: $el.closest(this.props.select),
				all: $(this.props.select)
			}
		}
		toggleOnFieldClick(e) {

			e.preventDefault();
			
			const $target = $(e.currentTarget);
			const {current, all} = this.getSelect($target);

			this.resetDropdownsPosition(current);

			if (current.hasClass(FOCUS)) {
				all.removeClass(FOCUS);
			} else {
				//1. find scrollable parent and his offset top and bottom
				//2. hide all other containers and show current
				//3. find current dropdown and his offset top and bottom
				//4. compare: if dropdown is not in visible zone - move it into this zone
				const $scrollableParent = $target.scrollParent();
				const scrollable = $scrollableParent.get(0).tagName;

				all.removeClass(FOCUS);
				current.addClass(FOCUS);
				
				if (!scrollable) return;

				const parentOffsetTop = $scrollableParent.offset().top;
				const parentHeight = $scrollableParent.outerHeight();
				const parentOffsetBottom = parentOffsetTop + parentHeight;

				const $dropdown = current.find(this.props.dropdown);

				const dropdownOffsetTop = $dropdown.offset().top;
				const dropdownHeight = $dropdown.outerHeight();
				const dropdownOffsetBottom = dropdownOffsetTop + dropdownHeight;
				
				console.log(parentOffsetBottom, dropdownOffsetBottom);

				if (parentOffsetBottom <= dropdownOffsetBottom) {
					current.addClass('select_top');
				}
			}

		}
		closeOnBodyClick(e) {

			const $target = $(e.target);
			const {current, all} = this.getSelect($target);

			if (current.length || !all.hasClass(FOCUS)) return;
			all.removeClass(FOCUS);
			this.resetDropdownsPosition(all);

		}
		selectItem(e) {

			const $target = $(e.currentTarget);
			const $item = $target.closest(this.props.item);
			const $select = $target.closest(this.props.select);
			const $value = $select.find(this.props.value);
			const $inputs = $select.find(`${this.props.item} input`);
			const $checkedInputs = $select.find(`${this.props.item} input:checked`);
			const select = $select.get(0);


			const value = $target.data('value');
			const index = $item.index();
			const valueArray = [];

			if (!select._value) select._value = {};

			if ($target.prop('checked')) {
				select._value[`key_${index}`] = value;
			} else {
				delete select._value[`key_${index}`];
			}
			
			for (let key in select._value) {
				valueArray.push(select._value[key]);
			}

			this.setTextValue({
				select: $select,
				inputs: $inputs,
				checkedInputs: $checkedInputs,
				value: $value,
				textValue: valueArray.join(', ')
			});

		}
		selectAll(e) {
			const $target = $(e.currentTarget);
			const $item = $target.closest(this.props.item);
			const $select = $target.closest(this.props.select);
			const $value = $select.find(this.props.value);
			const $inputs = $select.find(`${this.props.item} input`);
			const $checkedInputs = $select.find(`${this.props.item} input:checked`);
			const select = $select.get(0);

			const value = $target.data('value');
			const index = $item.index();
			const valueArray = [];

			if (!select._value) select._value = {};
			
			if ($inputs.length === $checkedInputs.length) {
				$inputs.each((i, input) => {
					const $input = $(input);
					if (!$input.prop('checked')) return;
					$input.prop('checked', false);
					$input.trigger('change');
				});
			} else {
				$inputs.each((i, input) => {
					const $input = $(input);
					if ($input.prop('checked')) return;
					$input.prop('checked', true);
					$input.trigger('change');
				});
			}
		}

		setInitialValues() {
			const $select = this.props.selectNode;
			const $value = $select.find(this.props.value);
			const $inputs = $select.find(`${this.props.item} input`);
			const $checkedInputs = $select.find(`${this.props.item} input:checked`);
			const select = $select.get(0);
			
			if (!select._value) select._value = {};

			const selectValue = select._value;
			const selectValueArray = [];

			$inputs.each((index, input) => {

				const $input = $(input);
				if (!$input.prop('checked')) return;
				const parentIndex = $input.closest(this.props.item).index();
				const value = $input.data('value');
				selectValue[`key_${parentIndex}`] = value;
				selectValueArray.push(value);

			});

			this.setTextValue({
				select: $select,
				inputs: $inputs,
				checkedInputs: $checkedInputs,
				value: $value,
				textValue: selectValueArray.join(', ')
			});
		}

		setTextValue(props) {
			const {select, inputs, checkedInputs, value, textValue} = props;

			const text = inputs.length === checkedInputs.length 
				? select.data('all-checked')
				: textValue;

			if (inputs.length !== checkedInputs.length) select.find(`${this.props.selectAll} input`).prop('checked', false);
			if (inputs.length === checkedInputs.length) select.find(`${this.props.selectAll} input`).prop('checked', true);
			
			value.text(text);

			text.length && !select.hasClass(ACTIVE) && select.addClass(ACTIVE);
			!text.length && select.removeClass(ACTIVE);
			this.resetDropdownsPosition(select);
		}

		resetDropdownsPosition(containers) {
			containers.removeClass('select_top');
		}
	}

	$('.js-multi-select').each(function(i, select) {
		new MultiSelect({
			selectNode: $(select),
			select: '.js-multi-select',
			field: '.js-multi-select-field',
			item: '.js-multi-select-item',
			value: '.js-multi-select-value',
			selectAll: '.js-multi-select-all',
			dropdown: '.js-multi-select-dropdown'
		});
	});

};