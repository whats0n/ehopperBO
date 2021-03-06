import rippleEffect from './_ripple-effect';
import modal from './_modal';
import dropdown from './_dropdown';
import tabs from './_tabs';
import menu from './_menu';
import nav from './_nav';
import simpleSwipe from './_simple-swipe';
import table from './_table';
import chart from './_chart';
import sortable from './_sortable';
import resizableLayout from './_resizable-layout';
import popup from './_popup';
import slide from './_slide';
import lang from './_lang';
import toggle from './_toggle';
import showOnRadio from './_showon-radio';

export default (function() {
	
	rippleEffect();
	modal();
	dropdown();
	tabs();
	menu();
	nav();
	simpleSwipe();
	table();
	chart();
	sortable();
	resizableLayout();
	popup();
	slide();
	lang();
	toggle();
	showOnRadio();

})();