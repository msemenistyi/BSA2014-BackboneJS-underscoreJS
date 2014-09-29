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

        /*ui: {
            deleteButton:  '.delete-button',
            renameButton:  '.rename-button',
            undoButton:    '.undo-button',
            filmNameLabel: '.film-name-label',
            filmDetails:   '.film-details',
            filmItem:      '.film-item'
        },

        events: {
            'click @ui.deleteButton':     'deleteFilm',
            'click @ui.renameButton':     'activateEditor',
            'click @ui.undoButton':       'undoChanges',
            'keypress @ui.filmNameLabel': 'deactivateEditor'
        },*/

        initialize: function(options) {
            this.model = options.model;
            this.render();
        }

        /*deleteFilm: function() {
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
                    this.model.store();
                    this.model.save({ name: filmName });
                }
            }
        },

        undoChanges: function() {
            this.model.restore();
            if (_.isEmpty(this.model.changed)) {
                this.ui.undoButton.hide();
                return false;
            }
            this.model.save();
        },

        modelChanged: function() {
            this.render();
            if (!_.isEmpty(this.model.changed)) {
                this.ui.undoButton.show();
                return false;
            }
        }*/
    });

    return FilmView;
});