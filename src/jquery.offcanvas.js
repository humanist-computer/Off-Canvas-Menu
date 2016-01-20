var inArray = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};
/* ========================================================================
* Classes: classes.js v1.0.0
* http://aaronmarr.co.uk
* ======================================================================== */
;!(function ($) {
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
})(jQuery);


/* ========================================================================
* jQuery offcanvas menu Group: jquery.offcanvas.js v1.0.0
* http://aaronmarr.co.uk
* ======================================================================== */
(function ($) {

    $.fn.offcanvas = function(options) {

        // Settings
        var $nav = $(this),

        // Extend default settings here...
        settings = $.extend({
            direction: 'left'
        }, options );

        var ui = {
            body: $('body')
        }

        var mainClasses = ['in', 'menu-slider-left', 'menu-slider-right'];

        var menuVisbleClass = 'js-menu-visible';

        function pushArray(arr, arr2) {
            arr.push.apply(arr, arr2);
        }

        var status = {
            bodyClasses: [],
        }

        // Checks dom to see if menu classes are present on body
        function menuIsVisible() {
            return $(ui.body).hasClass(menuVisbleClass);
        }

        // Helper to add or remove classes from an array of elements
        function addRemoveClass(method, elements, classes) {
            var i;
            for (i = 0; i < elements.length; i++) {
                $(elements[i])[method](classes);
            }
        };

        function removeSliderClasses(elements, classes, direction) {
            var i, j;
            for (i = 0; i < elements.length; i++) {
                for (j = 0; j < classes.length; j++) {
                    $(elements[i]).removeClass(classes[j]);
                }
            }
        }

        // Sets up transitions for elements
        function setUpTransitions(elements) {
            var i;
            for (i = 0; i < elements.length; i++) {
                $(elements[i]).addClass('transition');
            }
        }

        function toggleStatus(direction) {
            menuIsVisible = !menuIsVisible;
        }

        function toggleMenuVisibility() {
            if ( menuIsVisible() ) {
                addRemoveClass('removeClass', ui.body, menuVisbleClass);
                updateBodyClasses();
            } else {
                addRemoveClass('addClass', ui.body, menuVisbleClass);
                updateBodyClasses();
            }
        }

        function updateBodyClasses (newClasses) {
            var oldBodyClasses = status.bodyClasses;
            // Use the passes in classes or get them form the DOM
            var newBodyClasses = newClasses || getBodyClasses();
            // Update the bodyClasses array
            status.bodyClasses.push.apply(oldBodyClasses, newBodyClasses);
        }

        function getBodyClasses() {
            return $(ui.body).classes();
        }

        // Initialization
        function init() {
            var elements = settings.elements;
            var direction = settings.direction;

            // Set up the DOM elements for transitions...
            addRemoveClass('addClass', elements, 'transition');

            console.log('direction', direction);

            $nav
                .on('show.bs.collapse', function (e) {
                    if (menuIsVisible()) {

                        var classes = getBodyClasses(),
                            needle = 'menu-slider-' + direction;

                        if (menuIsVisible() && inArray.call(classes, needle)) {
                            removeSliderClasses(elements, mainClasses, 
                                direction);
                        } else {
                            removeSliderClasses(elements, 
                                mainClasses, direction);
                            addRemoveClass('addClass', elements, 'menu-slider-'
                                + direction)
                        }
                    } else {
                        addRemoveClass('addClass', elements, 'menu-slider-' 
                            + direction);
                        toggleMenuVisibility();
                    }
                })
                .on('shown.bs.collapse', function (e) {
                    addRemoveClass('addClass', elements, 'in');
                })
                .on('hide.bs.collapse', function (e) {

                    var classes = getBodyClasses(),
                        needle = 'menu-slider-' + direction;

                    if (menuIsVisible() && inArray.call(classes, needle)) {
                        addRemoveClass('removeClass', elements, 'menu-slider-' 
                            + direction);
                        addRemoveClass('removeClass', elements, 'in');
                        toggleMenuVisibility();
                    } else if (menuIsVisible()){
                        removeSliderClasses(elements, 
                            mainClasses, direction);
                        addRemoveClass('addClass', elements, 'menu-slider-'
                            + direction)
                        addRemoveClass('addClass', elements, 'in');
                    } else {
                        addRemoveClass('removeClass', elements, 'menu-slider-' 
                            + direction);
                        toggleMenuVisibility();
                    }                    
                })
                .on('hidden.bs.collapse', function (e) {
                    if (!menuIsVisible()) {
                        addRemoveClass('removeClass', elements, 'in');
                    }
                });
        };
        init();
    };
}( jQuery ));