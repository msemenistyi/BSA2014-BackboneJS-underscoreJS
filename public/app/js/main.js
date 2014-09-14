require.config({
    paths: {
        jquery:     'libs/jquery-2.1.1',
        underscore: 'libs/underscore',
        backbone:   'libs/backbone',
        text:       'libs/text'
    }
});

require(['app'], function(App) {
    App.start();
});