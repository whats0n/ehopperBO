import {ACTIVE, $DOCUMENT} from '../_constants';

export default function() {

	$DOCUMENT.on('focus', '.js-field-input', e => {
		const $input = $(e.currentTarget);
		const $field = $input.closest('.js-field');
		if (!$input.val().length) $field.addClass(ACTIVE);;
	});

	$DOCUMENT.on('blur', '.js-field-input', e => {
		const $input = $(e.currentTarget);
		const $field = $input.closest('.js-field');
		if (!$input.val().length) $field.removeClass(ACTIVE);
	});

};