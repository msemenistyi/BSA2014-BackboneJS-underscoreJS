define([
    'jquery',
    'underscore',
    'backbone',
    'collections/films',
    'views/film-list-item'
], function($, _, Backbone, FilmsCollection, FilmView) {
    var FilmsListView = Backbone.View.extend({
        el:       $("#content"),
        template: _.template($("#films-list-view-tpl").html()),

        events: {
            "click #add-film-button": "addFilm"
        },

        initialize: function(options) {
            this.collection = new FilmsCollection({
                filmsUrl: options.collectionUrl
            });

            this.collection.on("add", this.renderFilm, this);
        },

        renderFilm: function(film) {
            var filmView = new FilmView({ model: film });
            this.$el.find("#films-list").append(filmView.render().el);
        },

        renderEmptyFilms: function() {
            //TODO: implement
        },

        render: function() {
            var that = this;

            this.$el.html(this.template());

            this.collection.fetch({
                success: function(films, res, req) {
                    if (!films.length) {
                        that.renderEmptyFilms();
                    } else {
                        _.each(films.models, function(film) {
                            that.renderFilm(film);
                        });
                    }
                }
            });
        },

        addFilm: function() {
            var filmData = this.validateNewFilm();
            if (filmData.errors.length) {
                alert(filmData.errors.join("\n"));
                return;
            }

            this.collection.create({
                name: filmData.name,
                year: '(' + filmData.year + ')'
            }, { wait: true });

            this.clearFilmInputs();
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
        },

        clearFilmInputs: function() {
            this.$el.find("#film-name-input").val('');
            this.$el.find("#film-year-input").val('');
        }
    });

    return FilmsListView;
});