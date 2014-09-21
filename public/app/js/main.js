require.config({
    paths: {
        jquery:     'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone:   'libs/backbone',
        text:       'libs/text',
        marionette: 'libs/backbone.marionette'
    }
});

require([
    'app',
    'backbone',
    'router',
    'controllers/film'
], function(App, Backbone, Router, Controller) {
    App.start();

    new Router({ controller : Controller });

    Backbone.history.start();

    console.log("App started");
});