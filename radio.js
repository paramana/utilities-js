/*!
 * Version: 1.0
 * Started: 11-06-2013
 * Updated: 11-06-2013
 * Author : paramana (hello AT paramana DOT com)
 *
 */

define([
    'jquery'
], function($) {
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";

    // Create the defaults once
    var pluginName = "radio",
        defaults   = {
            checkedClass:  "checked",
            rel: this,
            onchange: function(){}
        };

    // The actual plugin constructordropdown-element
    function RadioBtn(element, options) {
        this.element = element;
        this.$element = $(element);
        this.$radio = this.$element.find('input:radio');
        this.$btn = this.$radio.parent();
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
        
        this.toggleCheck();
        this.events();
    };
    
    RadioBtn.prototype.toggleCheck = function() {
        if (!this.enabled)
            return false;
            
        var checked   = this.$radio.is(':checked'),
            $gChecked = [];
    
        if (checked) {
            $gChecked = this.$inputs.filter('.checked');
            
            $gChecked
                    .removeClass(this.options.checkedClass)
                    .closest('.radio-element')
                    .removeClass(this.options.checkedClass);;
            
            this.$radio.addClass(this.options.checkedClass);
            this.$element.addClass(this.options.checkedClass);
        }
        else {
            this.$radio.removeClass(this.options.checkedClass);
            this.$element.removeClass(this.options.checkedClass);
        }
    };

    RadioBtn.prototype.events = function() {
        var _self = this;

        this.$radio.on({
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
            }
        });
        
        this.$element.on({
           click: function(){
               $(this).find('input').prop('checked', 'checked');
               _self.toggleCheck();
           } 
        });
    };
    
    RadioBtn.prototype.enable = function() {
        this.$element.removeClass('disabled');
        this.$radio.removeAttr('disabled');
        this.enabled = true;
    }
    
    RadioBtn.prototype.disable = function() {
        this.$element.addClass('disabled');
        this.$radio.attr('disabled', 'disabled');
        this.enabled = false;
    }
    

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                        new RadioBtn(this, options));
            }
        });
    }
});