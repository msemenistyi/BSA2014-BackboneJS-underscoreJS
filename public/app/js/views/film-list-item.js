define([
    'jquery',
    'underscore',
    'thorax',
    'handlebars',
    'text!templates/film-view.handlebars'
], function($, _, Thorax, Handlebars, template) {
    var FilmView = Thorax.View.extend({
        name: 'film-item',
        template: Handlebars.compile(template),

        events: {
            'click .delete-button':      'deleteFilm',
            'click .rename-button':      'activateEditor',
            'click .undo-button':        'undoChanges',
            'keypress .film-name-label': 'deactivateEditor',

            model: {
                change: "modelChanged"
            }
        },

        initialize: function(options) {
            this.model = options.model;
            this.render();
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
                filmNameSpan = this.$el.find(".film-name-label"),
                $input       = $("<input>", {
                    val:     filmNameSpan.text(),
                    type:    "text",
                    id:      "film-item-" + filmID,
                    film_id: filmID
                });

            $input.addClass("film-name-label");
            $(filmNameSpan).replaceWith($input);
            $input.select();
            this.$el.find(".film-details").hide();
        },

        deactivateEditor: function(e) {
            if (e.charCode == 13) {
                var filmInput = this.$el.find('.film-name-label'),
                    filmName  = filmInput.val(),
                    $span = $("<span>", {
                        text: filmInput.val()
                    });

                $span.addClass("film-name-label");
                filmInput.replaceWith($span);
                this.$el.find(".film-details").show();

                if (this.model.get("name") != filmName) {
                    this.model.store();
                    this.model.save({ name: filmName });
                }
            }
        },

        undoChanges: function() {
            this.model.restore();
            if (_.isEmpty(this.model.changed)) {
                this.$el.find('.undo-button').hide();
                this.model.save();
            }
        },

        modelChanged: function() {
            if (!_.isEmpty(this.model.changed)) {
                this.$el.find('.undo-button').show();
                this.model.save();
            }
        }
    });

    return FilmView;
});