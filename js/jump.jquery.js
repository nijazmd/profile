/*
 *  jquery-boilerplate - v3.4.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "jump",
				defaults = {
				sufix: "-sec",
				speed: 800,
				animation: 'swing'
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
					this.grabSettings();
					this.hookJumps( this);
				},

				grabSettings: function() {
					var speed = $(this.element).data( 'speed');

					if( speed != undefined)
						this._defaults.speed = speed;

					var sufix = $(this.element).data( 'sufix');

					if( sufix != undefined)
						this._defaults.sufix = sufix;

					var animation = $(this.element).data( 'animation');

					if( animation != undefined)
						this._defaults.animation = animation;
				},

				hookJumps: function () {
					var settings = this._defaults;
					$(this.element).children('li').children('a').click(function( e) {
						var link = $(this).attr('href');
						if( link.charAt(0) == '#'){
							e.preventDefault();

							link = link.substr(1);

							link = '#' + link + settings.sufix;

							$('html,body').animate({scrollTop: $(link).offset().top}, settings.speed, settings.animation);
						}
					});
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
		};

	$('ul.primary-menu').jump();
})( jQuery, window, document );