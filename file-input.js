define([
    'jquery'
], function($) {
    // Using ECMAScript 5 strict mode during development. By default r.js will ignore that.
    "use strict";
    
    function init() {
        $('input[type=file].file-input').each(function(i, elem) {
            var $this      = $(this),
                buttonWord = 'Browse';
                
            // Maybe some fields don't need to be standardized.
            if ($this.data('file-input-enabled')) {
                return;
            }

            if (typeof $this.attr('title') != 'undefined')
                buttonWord = $this.attr('title');
            
            var $newInput = $this.clone().data('file-input-enabled', true),
                $newEl    = $('<a class="file-input-wrapper btn ' + $this.attr('class') + '"></a>')
                                .append(buttonWord)
                                .append($newInput);
                
            
            $this.replaceWith($newEl);
            
            $newInput.change(function() {
                var $this = $(this);
                // Remove any previous file names
                $this.parent().next('.file-input-name').remove();
                if ($this.prop('files').length > 1) {
                    $this.parent().after('<span class="file-input-name">' + $this[0].files.length + ' files</span>');
                }
                else {
                    $this.parent().after('<span class="file-input-name">' + $this.val().replace('C:\\fakepath\\', '') + '</span>');
                }
            });
        });
    }

    return {
        init: init
    };
});