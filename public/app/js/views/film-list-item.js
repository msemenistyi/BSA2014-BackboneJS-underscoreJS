define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var FilmView = Backbone.View.extend({
        template: _.template($("#film-view-tpl").html()),
        events: {
             "click .delete-button":       "deleteFilm",
             "click .rename-button":       "activateEditor",
             "keypress .film-name-label":  "deactivateEditor"
        },

        ui: {
            filmNameLabel: ".film-name-label",
            filmDetails:   ".film-details"
        },

        initialize: function(options) {
            this.model = options.model;
            this.model.on("destroy", this.remove, this);
            this.model.on('change', this.render, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        deleteFilm: function() {
            if (!confirm("Delete this film")) {
                return false;
            } else {
                this.model.destroy();
                return false;
            }
        },

        activateEditor: function() {
            var filmID       = this.model.get("id"),
                filmNameSpan = this.$el.find(this.ui.filmNameLabel),
                $input       = $("<input>", {
                    val:     filmNameSpan.text(),
                    type:    "text",
                    id:      "film-item-" + filmID,
                    film_id: filmID
                });

            $input.addClass("film-name-label");
            $(filmNameSpan).replaceWith($input);
            $input.select();
            this.$el.find(this.ui.filmDetails).hide();
        },

        deactivateEditor: function(e) {
            if (e.charCode == 13) {
                var filmInput = this.$el.find(this.ui.filmNameLabel),
                    filmName  = filmInput.val(),
                    $span = $("<span>", {
                        text: filmInput.val()
                    });

                $span.addClass("film-name-label");
                filmInput.replaceWith($span);
                this.$el.find(this.ui.filmDetails).show();

                if (this.model.get("name") != filmName) {
                    this.updateFilm(this.model, { name: filmName });
                }
            }
        },

        updateFilm: function(film, attributes) {
            film.save(attributes);
        }

    });

    return FilmView;
});