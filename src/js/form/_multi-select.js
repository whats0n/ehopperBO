import {ACTIVE, FOCUS, smartClick, $DOCUMENT} from '../_constants';

export default function() {
	class MultiSelect {
		constructor(props) {
			this.props = props;
			this._value = {};
			this.addHandlers();
		}
		addHandlers() {
			const that = this;
			smartClick(this.props.field, function(e) {
				that.toggleOnFieldClick.call(this, e, that.props);
			});
			smartClick('body', function(e) {
				that.closeOnBodyClick.call(this, e, that.props);
			});
			$DOCUMENT.on('change', `${this.props.item} input`, function(e) {
				that.selectItem.call(this, e, that);
			})
		}
		toggleOnFieldClick(e, props) {
			e.preventDefault();
				
			const $this = $(this);
			const $select = $this.closest(props.select);
			const $selects = $(props.select);
			
			if ($select.hasClass(FOCUS)) {
				$selects.removeClass(FOCUS);
			} else {
				$selects.removeClass(FOCUS);
				$select.addClass(FOCUS);
			}
		}
		closeOnBodyClick(e, props) {
			const $target = $(e.target);
			const $select = $target.closest(props.select);
			const $selects = $(props.select);
			if ($select.length || !$selects.hasClass(FOCUS)) return;
			$selects.removeClass(FOCUS);
		}
		selectItem(e, selectObject) {
			const $this = $(this);
			const $select = $this.closest(selectObject.props.select);
			const $value = $select.find(selectObject.props.value);
			const $parent = $this.closest(selectObject.props.item);
			const $allInputs = $select.find('input');
			const $allCheckedInputs = $select.find('input:checked');
			const value = $this.data('value');
			const index = $parent.index();
			const selectValue = selectObject._value;
			const selectValueArray = [];
			const allSelectedText = $select.data('all-checked');
			
			if ($this.prop('checked')) {
				selectValue[`key_${index}`] = value;
			} else {
				delete selectValue[`key_${index}`];
			}
			
			for (let key in selectValue) {
				selectValueArray.push(selectValue[key]);
			}

			const text = $allInputs.length === $allCheckedInputs.length 
				? allSelectedText
				: selectValueArray.join(', ');

			$value.text(text);

			text.length && !$select.hasClass(ACTIVE) && $select.addClass(ACTIVE);
			!text.length && $select.removeClass(ACTIVE);
		}
	}

	new MultiSelect({
		select: '.js-multi-select',
		field: '.js-multi-select-field',
		item: '.js-multi-select-item',
		value: '.js-multi-select-value'
	});
};