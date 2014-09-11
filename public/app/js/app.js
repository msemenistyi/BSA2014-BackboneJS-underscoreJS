define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'config'
], function($, _, Backbone, Router, config) {
    var start = function() {
        console.log("App started");
        Router.initialize(config);
    };

    return {
        start: start
    };
});