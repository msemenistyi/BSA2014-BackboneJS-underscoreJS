require.config({
    paths: {
        jquery:     'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone:   'libs/backbone',
        handlebars: 'libs/handlebars-v2.0.0',
        thorax:     'libs/thorax',
        text:       'libs/text',
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

        'thorax': {
            deps: ['handlebars'],
            exports: 'Thorax'
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

require(['app'], function(App) {
    App.start();

    console.log("App started");
});