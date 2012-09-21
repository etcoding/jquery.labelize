// Creates a new label element for an input field, making it look like a regular label field.
// Will revert to input field on dbl-click.

(function ($) {
    $.fn.labelize = function (options) {
        var defaultOptions = {
            "element":"span",
            "class":"labelized",
            "event":"dblclick"
        };

        options = $.extend(defaultOptions, options);

        return this.each(function () {
            // must be an input field
            if (!($(this).is("input") || $(this).is("textarea")))
                return;

            var refId = generateRefId();
            $(this).attr('data-labelize-refid', refId);

            // generate element
            var label = $("<" + options.element + " class='" + options.class + "'></" + options.element + ">");
            label.attr("data-labelize-refid", refId);

            var sourceId = $(this).attr("id");
            if (!(sourceId === undefined))
                label.attr("data-labelize-source-id", sourceId);
            var sourceName = $(this).attr("name");
            if (!(sourceName === undefined))
                label.attr("data-labelize-source-name", sourceName);

            label.insertAfter($(this));

            var val = $(this).val();
            label.text(val);

            $(this).hide();
            label.show();

            // on bluring of input element display new label element
            $(this).blur(function () {
                restoreLabel($(this));
            });

            // and same on enter or esc keys
            $(this).keyup(function (e) {
                if (e.keyCode == 13) { // enter
                    restoreLabel($(this));
                }
                if (e.keyCode == 27) {  // esc will restore changes
                    restoreLabel($(this), true);
                }
            });

            // add event handler that will trigger change to input field
            label[options.event](function () {
                restoreInput(label);
            });
        });

        function restoreInput(labelElement) {
            var refId = labelElement.attr("data-labelize-refid");
            var input = $("input[data-labelize-refid='" + refId + "'], textarea[data-labelize-refid='" + refId + "']");
            var val = labelElement.text();
            input.val(val);
            labelElement.hide();
            input.show();
            input.focus();
        }

        function restoreLabel(inputElement, cancelChanges) {
            var refId = inputElement.attr("data-labelize-refid");
            var label = $("[data-labelize-refid='" + refId + "']:not(input):not(textarea)");
            if (cancelChanges === true) {
                inputElement.val(label.text());
            }
            else {  // restore value of input on esc
                var val = inputElement.val();
                label.text(val);
            }
            inputElement.hide();
            label.show();
        }

        function generateRefId() {
            if (generateRefId.generatedIds === undefined)
                generateRefId.generatedIds = [];
            var refId = null;
            do {
                refId = Math.random().toString().substr(2);
            }
            while (generateRefId.generatedIds.indexOf(refId) >= 0);

            generateRefId.generatedIds.push(refId);

            return refId;
        }
    };
})(jQuery);