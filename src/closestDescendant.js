/*
 * closestDescendant
 * https://github.com/tlindig/jquery-closest-descendant
 *
 * Copyright (c) 2013 Tobias Lindig
 * Licensed under the MIT license.
 */

(function( $ ) {

	/**
	 * Get the first element(s) that matches the selector by traversing down
	 * through descendants in the DOM tree level by level. It use a breadth
	 * first search (BFS), that mean it will stop search and not going deeper in
	 * the current subtree if the first matching descendant was found.
	 *
	 * @param  {selectors} selector -required- a jQuery selector
	 * @param  {boolean} findAll -optional- default is false, if true, every
	 *                           subtree will be visitied until first match
	 * @return {jQuery} matched element(s)
	 */
	$.fn.closestDescendant = function(selector, findAll) {

		if (!selector || selector === '') {
			return $();
		}

		findAll = findAll ? true : false;

		var resultSet = $();

		this.each(function() {

			var $this = $(this);

			// breadth first search for every matched node,
			// go deeper, until a child was found in the current subtree or the leave was reached.
			var queue = [];
			queue.push( $this );
			while ( queue.length > 0 ) {
				var node = queue.shift();
				var children = node.children();
				for ( var i = 0; i < children.length; ++i ) {
					var $child = $(children[i]);
					if ( $child.is( selector ) ) {
						resultSet.push( $child[0] ); //well, we found one
						if ( ! findAll ) {
							return false;//stop processing
						}
					} else {
						queue.push( $child ); //go deeper
					}
				}
			}
		});

		return resultSet;
	};
})(jQuery);

(function( $ ) {
	// Collection method.
	$.fn.awesome = function() {
		return this.each(function(i) {
			// Do something awesome to each selected element.
			$(this).html('awesome' + i);
		});
	};

	// Static method.
	$.awesome = function(options) {
		// Override default options with passed-in options.
		options = $.extend({}, $.awesome.options, options);
		// Return something awesome.
		return 'awesome' + options.punctuation;
	};

	// Static method default options.
	$.awesome.options = {
		punctuation: '.'
	};

	// Custom selector.
	$.expr[':'].awesome = function(elem) {
		// Is this element awesome?
		return $(elem).text().indexOf('awesome') !== -1;
	};

})( jQuery );
