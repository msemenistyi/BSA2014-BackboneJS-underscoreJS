define([
    'jquery',
    'underscore',
    'marionette',
    'behaviors/behaviors',
    'text!templates/film-view.html'
], function($, _, Marionette, Behaviors, template) {
    var FilmView = Marionette.ItemView.extend({
        template: _.template(template),

        ui: {
            deleteButton:  '.delete-button',
            renameButton:  '.rename-button',
            filmNameLabel: '.film-name-label',
            filmDetails:   '.film-details',
            filmItem:      '.film-item'
        },

        events: {
            'click @ui.deleteButton':     'deleteFilm',
            'click @ui.renameButton':     'activateEditor',
            'keypress @ui.filmNameLabel': 'deactivateEditor'
        },

        behaviors: {
            Highlighter: {
                behaviorClass: Behaviors.Highlighter
            }
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
                filmNameSpan = this.ui.filmNameLabel,
                $input       = $("<input>", {
                    val:     filmNameSpan.text(),
                    type:    "text",
                    id:      "film-item-" + filmID,
                    film_id: filmID
                });

            $input.addClass("film-name-label");
            $(filmNameSpan).replaceWith($input);
            $input.select();
            this.ui.filmDetails.hide();
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
                this.ui.filmDetails.show();

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