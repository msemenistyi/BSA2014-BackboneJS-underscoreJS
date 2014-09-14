define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    var FilmView = Backbone.View.extend({
        template: _.template($("#film-view-tpl").html()),
        events: {
             "click .delete-button":   "deleteFilm",
             "click .rename-button":   "activateEditor",
             "blur .film-name-label":  "deactivateEditor"
        },

        ui: {
            filmNameLabel: ".film-name-label"
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
            var filmID = this.model.get("id");
            var filmNameSpan = this.$el.find(this.ui.filmNameLabel);

            var $input = $("<input>", {
                val:     filmNameSpan.text(),
                type:    "text",
                id:      "film-item-" + filmID,
                film_id: filmID
            });

            $input.addClass("film-name-label");
            $(filmNameSpan).replaceWith($input);
            $input.select();
        },

        deactivateEditor: function() {
            var filmInput = this.$el.find(this.ui.filmNameLabel);
            var filmName = filmInput.val();

            var $span = $("<span>", {
                text: filmInput.val()
            });
            $span.addClass("film-name-label");
            filmInput.replaceWith($span);

            this.updateFilm(this.model, { name: filmName });
        },

        updateFilm: function(film, attributes) {
            film.save(attributes);
        }

    });

    return FilmView;
});