/*!
 * Version: 1.0
 * Started: 14-06-2022
 * Updated: 14-06-2022
 * Author : paramana (hello AT paramana DOT com)
 *
 */

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function indexOf(member, startFrom) {
        'use strict';
        /*
        In non-strict mode, if the `this` variable is null or undefined, then it is
        set to the window object. Otherwise, `this` is automatically converted to an
        object. In strict mode, if the `this` variable is null or undefined, a
        `TypeError` is thrown.
        */

        if (this == null)
            throw new TypeError('Array.prototype.indexOf() - can\'t convert `' + this + '` to object');

        var index  = isFinite(startFrom) ? Math.floor(startFrom) : 0,
            that   = this instanceof Object ? this : new Object(this),
            length = isFinite(that.length) ? Math.floor(that.length) : 0;

        if (index >= length)
            return -1;

        if (index < 0)
            index = Math.max(length + index, 0);

        if (member === undefined) {
            /*
                Since `member` is undefined, keys that don't exist will have the same
                value as `member`, and thus do need to be checked.
            */
            do {
                if (index in that && that[index] === undefined)
                    return index;
            }

            while (++index < length);
        }
        else {
            do {
                if (that[index] === member)
                    return index;
            }

            while (++index < length);
        }

        return -1;
    };
}

if (!Array.isArray) {
    Array.isArray = function(arg) {
        'use strict';

        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
