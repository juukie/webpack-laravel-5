/**
 * Core
 * @author Naam <email>
 */
'use strict';

// Styles
require('./sass/styles.scss');

// Scripts
require('./utils.js');

define([
    'jquery',
    './modules/app'
], function ($, app) {

    app.init();

    var ElementRoutes = {
        '.js-gallery': function () {
            require('./modules/photoswipe');
        }
    };

    $.each(ElementRoutes, function (key, callback) {
        if ($(key).length) {
            callback();
            console.info('✓ ' + key);
        }
    });

    // Initialize WOW
    require(['wow'], function (WOW) {
        new WOW().init();
    });

});
