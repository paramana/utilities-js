/*!
 * Version: 1.0
 * Started: 07-02-2014
 * Updated: 07-02-2014
 * Author : paramana (hello AT paramana DOT com)
 *
 */

define([
    'jquery'
], function($) {
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    // Create the defaults once
    var pluginName = "checkbox",
        defaults   = {
            activeClass: "active",
            checkedClass:  "checked",
            rel: this,
            onchange: function(){}
        };

    // The actual plugin constructordropdown-element
    function CheckboxBtn(element, options) {
        this.element       = element;
        this.$element      = $(element);
        this.$checkbox     = this.$element.find('input:checkbox');
        this.originalValue = this.$checkbox.val();
        this.enabled       = true;
        
        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);
        
        this.context = this.options.rel;
        this.$inputs = this.context.find('input[name="' + this.$checkbox.attr('name') + '"]');
        
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    CheckboxBtn.prototype.init = function() {
        this.$element.addClass('checkbox-element');

        var dataValue = this.$element.attr('data-value'),
            _value    = this.$checkbox.val();

        if (dataValue && dataValue == _value) {
            this.$checkbox.attr('checked', 'checked');
        }

        this.toggleCheck();
        this.events();

        if (dataValue && dataValue == _value) {
            this.$checkbox.trigger('change');
        }
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
                    .attr('data-value', _value);
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
            change: function(e) {
                _self.toggleCheck();
            },
            click: function(e) {
                if (!_self.enabled)
                    return false;
                
                e.stopPropagation();
            },
            keyup: function() {
                if (!_self.enabled)
                    return false;
                
                _self.toggleCheck();
            },
            focus: function(event) {
                if (!_self.enabled)
                    return false;
                
                _self.$element.addClass(_self.options.activeClass);
            },
            blur: function(event) {
                if (!_self.enabled)
                    return false;
                
                _self.$element.removeClass(_self.options.activeClass);
            }
        });
        
        this.$element.on({
           click: function(){
               $(this)
                       .find('input:checkbox')
                       .prop('checked', 'checked')
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
    

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                        new CheckboxBtn(this, options));
            }
        });
    };
});