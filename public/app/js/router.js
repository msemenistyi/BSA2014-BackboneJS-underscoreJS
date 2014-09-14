define([
    'jquery',
    'underscore',
    'backbone',
    'views/films-list',
    'views/film-details'
], function($, _, Backbone, FilmsListView, FilmDetailsView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "details/:id": "showFilmDetails",
            "*actions":    "defaultRoute"
        }
    });

    var initialize = function(config) {
        var router = new AppRouter;

        router.on("route:showFilmDetails", function(id) {
            var filmDetailsView = new FilmDetailsView({
                detailsUrl: config.apiEndpoint + "filmdetails/" + id
            });

            filmDetailsView.render();
        });

        router.on("route:defaultRoute", function() {
            var filmsListView = new FilmsListView({
                collectionUrl: config.apiEndpoint + "films"
            });

            filmsListView.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});