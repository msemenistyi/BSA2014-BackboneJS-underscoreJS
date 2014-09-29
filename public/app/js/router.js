define([
    'jquery',
    'underscore',
    'backbone',
    'collections/films',
    'models/film',
    'views/header',
    'views/film-details',
    'views/film-manager'
], function($, _, Backbone, Films, Film, Header, FilmDetailsView, FilmManager) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "details/:id": "showFilmDetails",
            "*actions":    "showFilmsList"
        }
    });

    var regions = {
        header:  "#header",
        main:    "#main",
        details: "#details"
    };

    var initialize = function(config) {
        var router = new AppRouter;

        router.on("route:showFilmDetails", function(filmID) {
            var film = new Film;
            film.url = config.apiEndpoint + "filmdetails/" + filmID;

            film.fetch({
                success: function(model) {
                    $(regions.main).empty();
                    $(regions.details).empty();

                    var details = new FilmDetailsView({ model: model });
                    details.appendTo(regions.details);
                }
            });
        });

        router.on("route:showFilmsList", function() {
            var films = new Films({
                filmsUrl: config.apiEndpoint + "films"
            });

            films.fetch({
                success: function(collection) {
                    $(regions.main).empty();
                    $(regions.details).empty();

                    var filmManager = new FilmManager({
                        collection: collection
                    });
                    filmManager.appendTo(regions.main);
                }
            });
        });

        var header = new Header();
        header.appendTo(regions.header);

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});