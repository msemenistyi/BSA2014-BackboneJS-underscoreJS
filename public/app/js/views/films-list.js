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

        /*confirmFilmRemoving: function(e) {
            var filmID = $(e.target).data("id");
            if (!confirm("Delete this film")) {
                return false;
            } else {
                this.deleteFilm(filmID);
            }
        },

        deleteFilm: function(id) {
            var filmToDelete = _.findWhere(this.collection.models, {id: id});
            filmToDelete.destroy();
        },

        activateEditor: function(e) {
            var filmID = $(e.target).data("id");
            var filmNameSpan = $("#film-item-" + filmID + " .film-name-label");

            var $input = $("<input>", {
                val:     filmNameSpan.text(),
                type:    "text",
                id:      "film-item-" + filmID,
                film_id: filmID
            });

            $input.addClass("film-name-label");
            $(filmNameSpan).replaceWith($input);
            $input.on("blur", $.proxy(this.deactivateEditor, this));
            $input.select();
        },

        deactivateEditor: function(e) {
            var filmInput = $(e.target);
            var filmID    = filmInput.attr("film_id");
            var filmName  = filmInput.val();

            var $span = $("<span>", {
                text: filmInput.val()
            });
            $span.addClass("film-name-label");
            filmInput.replaceWith($span);

            this.updateFilm(Number(filmID), { name: filmName });
        },

        updateFilm: function(id, attributes) {
            var filmToUpdate = _.findWhere(this.collection.models, {id: id});
            filmToUpdate.save(attributes);
        }*/
    });

    return FilmsListView;
});