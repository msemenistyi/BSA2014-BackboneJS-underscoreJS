define([
    'marionette',
    'collections/films',
    'models/film',
    'views/header',
    'views/film-manager',
    'views/film-details',
    'config'
], function(Marionette, Films, Film, Header, FilmManager, FilmDetailsView, config) {
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
        films.on('sync', function() {
            app.main.show(new FilmManager({ collection: films }));
            app.details.empty();
        });

        films.fetch();
    });

    app.vent.on('film:details', function (filmID) {
        var film = new Film;
        film.url = config.apiEndpoint + "filmdetails/" + filmID;
        film.on('sync', function() {
            app.main.empty();
            app.details.show(new FilmDetailsView({ model: film }));
        });

        film.fetch({ cache: true });
    });

    return window.app = app;
});