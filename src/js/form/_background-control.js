import {ACTIVE, OPEN, smartClick, $DOCUMENT} from '../_constants';

export default function() {
	
	if (!$('.js-background-control').length) return;

	let called = false;

	class BackgroundControl {
		constructor(props) {
			this.props = props;

			this.openDropdown = this.openDropdown.bind(this);
			this.closeOnBodyClick = this.closeOnBodyClick.bind(this);
			this.selectColor = this.selectColor.bind(this);
			this.selectImage = this.selectImage.bind(this);
			this.submitBackground = this.submitBackground.bind(this);

			this.addHandlers();
		}

		addHandlers() {
			//check if it's not first call - do not add handlers
			if (called) return;
			called = !called;

			const { container, value, field, dropdown, color, file, figure, submit } = this.props;

			smartClick(field, this.openDropdown);
			smartClick(color, this.selectColor);
			smartClick(submit, this.submitBackground);
			smartClick('body', this.closeOnBodyClick);
			$DOCUMENT.on('change', file, this.selectImage);
		}

		openDropdown(e) {
			const $target = $(e.currentTarget);
			const {current, all} = this.getContainer($target);

			this.resetDropdownsPosition(all);

			if (current.hasClass(OPEN)) {
				all.removeClass(OPEN);
			} else {
				//1. find scrollable parent and his offset top and bottom
				//2. hide all other containers and show current
				//3. find current dropdown and his offset top and bottom
				//4. compare: if dropdown is not in visible zone - move it into this zone
				const $scrollableParent = $target.scrollParent();

				const parentOffsetTop = $scrollableParent.offset().top;
				const parentHeight = $scrollableParent.outerHeight();
				const parentOffsetBottom = parentOffsetTop + parentHeight;

				const parentOffsetLeft = $scrollableParent.offset().left;
				const parentWidth = $scrollableParent.outerWidth();
				const parentOffsetRight = parentOffsetLeft + parentWidth;

				all.removeClass(OPEN);
				current.addClass(OPEN);
				
				const $dropdown = current.find(this.props.dropdown);

				const dropdownOffsetTop = $dropdown.offset().top;
				const dropdownHeight = $dropdown.outerHeight();
				const dropdownOffsetBottom = dropdownOffsetTop + dropdownHeight;

				const dropdownOffsetLeft = $dropdown.offset().left;
				const dropdownWidth = $dropdown.outerWidth();
				const dropdownOffsetRight = dropdownOffsetLeft + dropdownWidth;

				if (parentOffsetBottom <= dropdownOffsetBottom) {
					$dropdown.css('top', parentOffsetBottom - dropdownOffsetBottom);
				// } else if (parentOffsetBottom > dropdownOffsetBottom && parentHeight >= dropdownHeight) {
				// 	$dropdown.css('top', 0);
				} else if (parentOffsetBottom > dropdownOffsetBottom) {
					$dropdown.css('top', parentOffsetTop - dropdownOffsetTop);
				}

				if (parentOffsetRight < dropdownOffsetRight && parentOffsetLeft > current.offset().left - dropdownWidth - 20) {
					$dropdown.css('left', -10);
				} else if (parentOffsetRight < dropdownOffsetRight) {
					$dropdown.css('left', -dropdownWidth - 20);
				}
			}
		}

		closeOnBodyClick(e) {

			const $target = $(e.target);
			const {current, all} = this.getContainer($target);

			if (current.length || !all.hasClass(OPEN)) return;
			all.removeClass(OPEN);
			this.resetDropdownsPosition(all);

		}

		selectColor(e) {
			const $target = $(e.currentTarget);
			const $container = $target.closest(this.props.container);
			const $color = $container.find(this.props.color);
			const $value = $container.find(this.props.value);
			const $figure = $container.find(this.props.figure);
			const $file = $container.find(this.props.file);

			const color = $target.data('value');

			$color.removeClass(ACTIVE);
			$target.addClass(ACTIVE);
			// $file
			// 	.val('')
			// 	.trigger('change');
			// $value.css({
			// 	'background-image': 'none',
			// 	'background-color': color
			// });
		}

		selectImage(e) {
			const $target = $(e.currentTarget);
			const target = $target.get(0);
			const $container = $target.closest(this.props.container);
			const $img = $container.find(this.props.img);
			const $figure = $container.find(this.props.figure);

			const file = target.files[0];
			const reader = new FileReader();
			
			reader.onload = () => {
				$figure.addClass(ACTIVE);
				$img
					.css({
						'background-image': `url(${reader.result})`
					})
					.data('value', reader.result);
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		}

		submitBackground(e) {
			const $target = $(e.currentTarget);
			const $container = $target.closest(this.props.container);
			const $color = $container.find(this.props.color);
			const $img = $container.find(this.props.img);
			const $value = $container.find(this.props.value);
			const $figure = $container.find(this.props.figure);

			switch ($target.data('type')) {
				case 'image': 
					const image = $img.data('value');
					
					if (!image || !image.length) return;
					
					$value.css({
						'background-image': `url(${image})`,
						'background-color': 'none'
					});
					break;
				case 'color':
					const color = $color.filter(`.${ACTIVE}`).data('value');

					if (!$color.filter(`.${ACTIVE}`).length) return;

					$value.css({
						'background-image': 'none',
						'background-color': color
					});
					break;
			}

			$container.removeClass(OPEN);
			this.resetDropdownsPosition($container);
		}

		resetDropdownsPosition(containers) {
			containers.find(this.props.dropdown).removeAttr('style');
		}

		getContainer($el) {
			return {
				current: $el.closest(this.props.container),
				all: $(this.props.container)
			}
		}
	}

	$('.js-background-control').each(function() {
		new BackgroundControl({
			containerNode: $(this),
			container: '.js-background-control',
			value: '.js-background-control-value',
			field: '.js-background-control-field',
			dropdown: '.js-background-control-dropdown',
			color: '.js-background-control-color',
			file: '.js-background-control-file',
			figure: '.js-background-control-figure',
			img: '.js-background-control-img',
			submit: '.js-background-control-submit'
		});
	});

};