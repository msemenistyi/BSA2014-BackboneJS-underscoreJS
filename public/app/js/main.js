require.config({
    paths: {
        jquery:     'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone:   'libs/backbone',
        text:       'libs/text',
        marionette: 'libs/backbone.marionette',
        fetchcache: 'libs/backbone.fetch-cache',
        memento:    'libs/backbone.memento',
        validation: 'libs/backbone-validation-amd'
    },
    shim: {
        'jquery': {
            exports: '$'
        },

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },

        'fetchcache': {
            deps: ['backbone']
        },

        'memento': {
            deps: ['backbone'],
            exports: 'Backbone.Memento'
        }
    }
});

require([
    'app',
    'backbone',
    'router',
    'controllers/film',
    'fetchcache'
], function(App, Backbone, Router, Controller) {
    App.start();

    new Router({ controller : Controller });

    Backbone.history.start();

    console.log("App started");
});