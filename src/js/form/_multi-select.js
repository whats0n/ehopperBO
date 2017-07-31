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

			const that = this;

			// smartClick(this.props.field, function(e) {
			// 	that.toggleOnFieldClick.call(this, e, that.props);
			// });

			smartClick(this.props.field, this.toggleOnFieldClick);
			smartClick('body', this.closeOnBodyClick);
			$DOCUMENT.on('change', `${this.props.item} input`, this.selectItem);
			$DOCUMENT.on('change', `${this.props.selectAll} input`, this.selectAll);

			// smartClick('body', function(e) {
			// 	that.closeOnBodyClick.call(this, e, that.props);
			// });

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

			if (current.hasClass(FOCUS)) {
				all.removeClass(FOCUS);
			} else {
				all.removeClass(FOCUS);
				current.addClass(FOCUS);
			}

		}
		closeOnBodyClick(e) {

			const $target = $(e.target);
			const {current, all} = this.getSelect($target);

			if (current.length || !all.hasClass(FOCUS)) return;
			all.removeClass(FOCUS);

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

				const value = $input.data('value');
				selectValue[`key_${index}`] = value;
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
		}
	}

	$('.js-multi-select').each(function(i, select) {
		new MultiSelect({
			selectNode: $(select),
			select: '.js-multi-select',
			field: '.js-multi-select-field',
			item: '.js-multi-select-item',
			value: '.js-multi-select-value',
			selectAll: '.js-multi-select-all'
		});
	});

};