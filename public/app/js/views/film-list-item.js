define([
    'jquery',
    'underscore',
    'backbone',
    'models/film'
], function($, _, Backbone, FilmModel) {
    var FilmView = Backbone.View.extend({
        template: _.template($("#film-view-tpl").html()),
        events: {
            "click #add-film-button": "addFilm"
            /*"click .delete-button":   "confirmFilmRemoving",
             "click .rename-button":   "activateEditor",
             "click .film-item":       "navigateToDetails"*/
        },

        initialize: function(options) {
            this.model = options.model;
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return FilmView;
});