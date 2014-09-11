define([
    'underscore',
    'backbone',
    'models/film'
], function(_, Backbone, FilmModel) {
    var FilmsCollection = Backbone.Collection.extend({
        model: FilmModel,

        initialize: function(options) {
            this.url = options.filmsUrl;
        }
    });

    return FilmsCollection;
});
