define([
    'underscore',
    'backbone',
    'thorax',
    'models/film'
], function(_, Backbone, Thorax, FilmModel) {
    var FilmsCollection = Thorax.Collection.extend({
        model: FilmModel,

        initialize: function(options) {
            this.url = options.filmsUrl;
        }
    });

    return FilmsCollection;
});
