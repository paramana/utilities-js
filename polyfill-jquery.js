/*!
 * Version: 1.0
 * Started: 02-05-2020
 * Updated: 02-05-2020
 * Author : paramana (hello AT paramana DOT com)
 *
 */
define(['jquery'], function($) {
    'use strict';

    if (typeof $.isArray != 'function') {
        $.isArray = Array.isArray;
	}
	
    if (typeof $.isFunction != 'function') {
        $.isFunction = function(f){ return typeof f == 'function' };
	}
	
    if (typeof $.trim != 'function') {
        $.trim = function(s){ return s.trim() };
    }
});
