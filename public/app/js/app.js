define([
    'marionette',
    'collections/films',
    'views/header',
    'views/film-manager',
    'config'
], function(Marionette, Films, Header, FilmManager, config) {
    var app = new Marionette.Application();

    var films = new Films({ filmsUrl: config.apiEndpoint + "films" });

    app.addRegions({
        header:  '#header',
        main:    '#main',
        details: '#details'
    });

    app.addInitializer(function() {
        app.header.show(new Header());
    });

    app.vent.on('films:show', function () {
        var main = new FilmManager({ collection: films });
        films.on('sync', function() {
            app.main.show(main);
            console.log("Render main region");
        });

        films.fetch();
    });

    app.vent.on('film:details', function (filmID) {
        console.log("Render #details region for filmID = %s", filmID);
    });

    return window.app = app;
});