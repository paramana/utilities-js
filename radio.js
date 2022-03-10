/*!
 * Version: 1.0
 * Started: 28-01-2014
 * Updated: 15-05-2020
 * Author : paramana (hello AT paramana DOT com)
 *
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
    typeof define === 'function' && define.amd ? define(['jquery'], factory) :
    (global.RadioBtn = factory(global.jQuery));
}(this, (function ($) {
    'use strict';

    // Create the defaults once
    var pluginName = 'radio',
        defaults   = {
            activeClass: 'active',
            checkedClass:  'checked',
            rel: this,
            onChange: function(){}
        };

    // The actual plugin constructor dropdown-element
    function RadioBtn(element, options) {
        this.element = element;
        this.$element = $(element);
        this.$radio = this.$element.find('input:radio');
        this.enabled = true;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this.context = this.options.rel;
        this.$inputs = this.context.find('input[name="' + this.$radio.attr('name') + '"]');

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    RadioBtn.prototype.init = function() {
        this.$element.addClass('radio-element');

        var dataValue = this.$element.data('value'),
            _value    = this.$radio.val();

        if (dataValue && dataValue == _value)
            this.$radio.attr('checked', 'checked');

        this.toggleCheck();
        this.events();

        if (dataValue && dataValue == _value)
            this.$radio.trigger('change');
    };

    RadioBtn.prototype.toggleCheck = function() {
        if (!this.enabled)
            return false;

        var checked   = this.$radio.is(':checked'),
            $gChecked = [];

        if (checked) {
            var _value = this.$radio.val();

            $gChecked = this.$inputs.filter('.checked');

            $gChecked
                .removeClass(this.options.checkedClass)
                .data('text', '')
                .closest('.radio-element')
                .data('value', _value)
                .removeClass(this.options.checkedClass);

            this.$radio
                .addClass(this.options.checkedClass)
                .data('text', this.$element.find('.radio-text:eq(0)').text());

            this.$element
                .addClass(this.options.checkedClass)
                .data('value', _value);
        }
        else {
            this.$radio.removeClass(this.options.checkedClass);
            this.$element.removeClass(this.options.checkedClass);
        }
    };

    RadioBtn.prototype.events = function() {
        var _self = this;

        this.$radio.on({
            change: function() {
                _self.toggleCheck();
            },
            click: function(event) {
                if (!_self.enabled)
                    return false;

                event.stopPropagation();
            },
            keyup: function() {
                if (!_self.enabled)
                    return false;

                _self.toggleCheck();
            },
            focus: function() {
                if (!_self.enabled)
                    return false;

                _self.$element.addClass(_self.options.activeClass);
            },
            blur: function() {
                if (!_self.enabled)
                    return false;

                _self.$element.removeClass(_self.options.activeClass);
            }
        });

        this.$element.on({
            click: function(){
                $(this)
                    .find('input:radio')
                    .prop('checked', 'checked')
                    .trigger('change');
            }
        });
    };

    RadioBtn.prototype.enable = function() {
        this.$element.removeClass('disabled');
        this.$radio.prop('disabled', false);
        this.enabled = true;
    };

    RadioBtn.prototype.disable = function() {
        this.$element.addClass('disabled');
        this.$radio.prop('disabled', true);
        this.enabled = false;
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if ($.data(this, 'plugin_' + pluginName))
                return;

            $.data(this, 'plugin_' + pluginName, new RadioBtn(this, options));
        });
    };
})));
