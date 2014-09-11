define([
    'jquery',
    'underscore',
    'backbone',
    'collections/films',
    'models/film'
], function($, _, Backbone, FilmsCollection, FilmModel) {
    var FilmsListView = Backbone.View.extend({
        el:       $("#content"),
        template: _.template($("#films-list-view-tpl").html()),

        events: {
            "click #add-film-button" : "addFilm"
        },

        initialize: function(options) {
            this.collection = new FilmsCollection({
                filmsUrl: options.collectionUrl
            });
            this.on("film:added", this.render, this);
        },

        render: function() {
            var that = this;

            this.collection.fetch({
                success: function(collection, response) {
                    that.$el.html(that.template({films: collection.toJSON()}));
                }
            });
        },

        addFilm: function() {
            var filmData = this.validateNewFilm();
            if (filmData.errors.length) {
                alert(filmData.errors.join("\n"));
                return;
            }

            var film = new FilmModel();
            film.url = this.collection.url;
            film.set({ name: filmData.name, year: '(' + filmData.year + ')'});
            film.save();

            this.trigger("film:added");
        },

        validateNewFilm: function() {
            var name = this.$el.find("#film-name-input").val(),
                year = this.$el.find("#film-year-input").val();

            var result = {
                name: name,
                year: year,
                errors: []
            };

            if (!name.length) {
                result.errors.push("Film's name should be not empty");
            }

            if (!(/\d{4}/.test(year))) {
                result.errors.push("Film's year should be 4 digits");
            }

            return result;
        }
    });

    return FilmsListView;
});