define([
    'marionette',
    'collections/films',
    'views/header',
    'config'
], function(Marionette, Films, Header, config) {
    var app = new Marionette.Application();

    var films = new Films({ filmsUrl: config.apiEndpoint + "films" });

    var viewOptions = {
        collection: films
    };

    var header = new Header();
    var main = null;
    var details = null;

    app.addRegions({
        header: '#header',
        main:   '#main',
        footer: '#details'
    });

    app.addInitializer(function() {
        app.header.show(header);
        //TODO show other items
        films.fetch();
    });

    app.vent.on('films:show', function () {
        console.log("Render #main region");
    });

    app.vent.on('film:details', function (filmID) {
        console.log("Render #details region for filmID = %s", filmID);
    });

    return window.app = app;
});