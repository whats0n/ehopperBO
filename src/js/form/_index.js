import field from './_field';
import select from './_select';
import multiSelect from './_multi-select';
import selectColor from './_select-color';
import productFilters from './_product-filters';
import backgroundControl from './_background-control';

export default (function() {

	field();
	select();
	multiSelect();
	selectColor();
	productFilters();
	backgroundControl();
	
})();