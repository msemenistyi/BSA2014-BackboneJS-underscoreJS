define([
    'jquery',
    'underscore',
    'backbone',
    'views/films-list',
    'views/film-details'
], function($, _, Backbone, FilmsListView, FilmDetailsView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "list":        "showFilmsList",
            "details/:id": "showFilmDetails"
        }
    });

    var initialize = function(config) {
        var router = new AppRouter;

        router.on("route:showFilmsList", function() {
            var filmsListView = new FilmsListView({
                collectionUrl: config.apiEndpoint + "films"
            });

            filmsListView.render();
        });

        router.on("route:showFilmDetails", function(id) {
            var filmDetailsView = new FilmDetailsView({
                detailsUrl: config.apiEndpoint + "filmdetails/" + id
            });

            filmDetailsView.render();
        });

        Backbone.history.start();

        router.navigate(config.defaultClientRoute, true);
    };

    return {
        initialize: initialize
    };
});