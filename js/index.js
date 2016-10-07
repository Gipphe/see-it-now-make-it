// Prevent global variable leaks to allow garbage collection
(function() {
	// Skip button element.
	var skipButton = document.getElementById('skip-button');
	// Height of the main image.
	var mainImageHeight = document.getElementById('main-image').scrollHeight;
	/*
	 * Returns the current screen scroll position relative to the top of the 
	 * document.
	 * 
	 * @return {number} Number value representing the number of pixels from the
	 * top of the document
	 */
	var getScrollOffset = function() {
		var y;
		var bodyEl;

		// IE 9+ non-quirks.
		if (typeof window.pageYOffset === 'number') {
			y = window.pageYOffset;
		} else { // IE in quirks mode.
			if (document.compatMode && document.compatMode === 'CSS1Compat') {
				bodyEl = document.documentElement;
			} else {
				bodyEl = document.body;
			}
			y = bodyEl.scrollTop;
		}
		// Convert to number.
		y = Number(y);

		return y;
	};

	/*
	 * Handles the scroll event. Determines whether the skip button shall be
	 * visible or not depending on the distance scrolled through the document
	 */
	var onScroll = function(event) {
		// get scroll offset on document.
		var offset = getScrollOffset();

		if (offset >= mainImageHeight) {
			// if scroll offset is higher than the image height, hide skip
			// button.
			skipButton.style.display = 'none';
		} else {
			// else, show skip button.
			skipButton.style.display = 'flex';
		}

		// Stagger scroll event listening
		// If scroll event handling is not staggered, scroll events will be
		// handled many tens of times, if not hundreds of times, per second.
		// This is unnecessary for this specific case.
		window.onscroll = null;
		setTimeout(function() {
			window.onscroll = onScroll;
		}, 100);
	};

	// Register onscroll handler on init
	window.onscroll = onScroll;

}());
