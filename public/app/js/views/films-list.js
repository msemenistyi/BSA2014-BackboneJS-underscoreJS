define([
    'jquery',
    'underscore',
    'backbone',
    'collections/films',
    'views/film-list-item',
    'views/films-empty-list'
], function($, _, Backbone, FilmsCollection, FilmView, FilmsEmptyListView) {
    var FilmsListView = Backbone.View.extend({
        template: _.template($("#films-list-view-tpl").html()),

        events: {
            "click #add-film-button": "addFilm"
        },

        ui: {
            filmsList:  "#films-list",
            filmYear:   "#film-year-input",
            filmName:   "#film-name-input",
            alertBlock: ".alert"
        },

        initialize: function(options) {
            this.collection = new FilmsCollection({
                filmsUrl: options.collectionUrl
            });

            this.collection.on("add", this.renderFilm, this);
            this.collection.on("remove", this.checkFilms, this);
        },

        renderFilm: function(film) {
            this.$el.find(this.ui.alertBlock).parent().remove();

            var filmView = new FilmView({ model: film });
            this.$el.find(this.ui.filmsList).append(filmView.render().el);
        },

        renderEmptyFilms: function() {
            var emptyFilmView = new FilmsEmptyListView;
            this.$el.find(this.ui.filmsList).append(emptyFilmView.render().el);
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
                },
                reset: true
            });

            // Fuck all the delegated zombies
            $("#content").empty().append(this.$el);
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
            var name = this.$el.find(this.ui.filmName).val(),
                year = this.$el.find(this.ui.filmYear).val();

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
            this.$el.find(this.ui.filmName).val('');
            this.$el.find(this.ui.filmYear).val('');
        },

        checkFilms: function() {
            if (!this.collection.length) {
                this.renderEmptyFilms();
            }
        }
    });

    return FilmsListView;
});