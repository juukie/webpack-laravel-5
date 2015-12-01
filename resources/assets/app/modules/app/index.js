/**
 * App
 * @author Naam <email>
 */
define(['jquery'], function ($) {

    'use strict';

    // CSRF Token
    var csrf_token = $('meta[name="csrf-token"]').attr('content');

    $(function () {
        $.ajaxSetup({
            headers: { 'X-CSRF-TOKEN': csrf_token }
        });
    });

    // Public available methods
    return {
        debug: function () {
            return __DEBUG__;
        },

        csrf_token: function () {
            return csrf_token;
        },

        scrollTo: function (offset, speed) {
            if (undefined === speed) {
                speed = 1000;
            }

            $('html, body').animate({
                scrollTop: Math.max(0, offset)
            }, speed);
        },

        init: function () {
            if (this.debug) {
                console.info('jQuery version ' + $.fn.jquery);
            }
        }
    };

});