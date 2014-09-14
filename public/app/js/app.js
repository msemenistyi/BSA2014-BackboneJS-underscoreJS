define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config'
], function($, _, Backbone, Router, config) {
    var start = function() {
        Router.initialize(config);
    };

    return {
        start: start
    };
});