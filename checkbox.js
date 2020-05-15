/*!
 * Version: 1.0
 * Started: 07-02-2014
 * Updated: 15-05-2020
 * Author : paramana (hello AT paramana DOT com)
 *
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.CheckboxBtn = factory());
}(this, function () {
    'use strict';

    var pluginName = 'checkbox',
        defaults   = {
            activeClass: 'active',
            checkedClass:  'checked',
            rel: this,
            onChange: function(){}
        };

    function CheckboxBtn(element, options) {
        this.element       = element;
        this.$element      = $(element);
        this.$checkbox     = this.$element.find('input:checkbox');
        this.originalValue = this.$checkbox.val();
        this.enabled       = true;

        this.options = $.extend({}, defaults, options);

        this.context = this.options.rel;
        this.$inputs = this.context.find('input[name="' + this.$checkbox.attr('name') + '"]');

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    CheckboxBtn.prototype.init = function() {
        this.$element.addClass('checkbox-element');

        var dataValue = this.$element.data('value'),
            _value    = this.$checkbox.val();

        if (dataValue && dataValue == _value)
            this.$checkbox.attr('checked', 'checked');

        this.toggleCheck();
        this.events();

        if (dataValue && dataValue == _value)
            this.$checkbox.trigger('change');
    };

    CheckboxBtn.prototype.toggleCheck = function() {
        if (!this.enabled)
            return false;

        var checked = this.$checkbox.is(':checked'),
            _value  = this.originalValue;

        if (checked) {
            this.$checkbox
                .val(_value)
                .addClass(this.options.checkedClass)
                .data('text', this.$element.find('.checkbox-text:eq(0)').text());

            this.$element
                .addClass(this.options.checkedClass)
                .data('value', _value);
        }
        else {
            this.$checkbox.removeClass(this.options.checkedClass);
            this.$element.removeClass(this.options.checkedClass);
            this.$checkbox.val('');
        }
    };

    CheckboxBtn.prototype.events = function() {
        var _self = this;

        this.$checkbox.on({
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
                var checked = _self.$checkbox.prop('checked');

                _self.$checkbox
                    .prop('checked', checked ? '' : 'checked')
                    .trigger('change');
            }
        });
    };

    CheckboxBtn.prototype.enable = function() {
        this.$element.removeClass('disabled');
        this.$checkbox.removeAttr('disabled');
        this.enabled = true;
    };

    CheckboxBtn.prototype.disable = function() {
        this.$element.addClass('disabled');
        this.$checkbox.attr('disabled', 'disabled');
        this.enabled = false;
    };

    CheckboxBtn.prototype.destroy = function() {
        this.$checkbox.off();
        this.$element.off();
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if ($.data(this, 'plugin_' + pluginName))
                return;

            $.data(this, 'plugin_' + pluginName, new CheckboxBtn(this, options));
        });
    };
}));
