define([
    'underscore',
    'marionette',
    'validation',
    'views/film-list-item',
    'views/films-empty-list',
    'text!templates/film-manager.html'
], function(_, Marionette, BackboneValidation, FilmView, FilmsEmptyListView, template) {
    var FilmManager = Marionette.CompositeView.extend({
        template:           _.template(template),
        childView:          FilmView,
        emptyView:          FilmsEmptyListView,
        childViewContainer: '#films-list',

        ui: {
            addFilmButton: "#add-film-button",
            filmName     : "#film-name-input",
            filmYear     : "#film-year-input",
            alertBlock   : ".alert",
            filmsList    : "#films-list"
        },

        events: {
            'click @ui.addFilmButton': 'addFilm'
        },

        initialize: function() {
            Backbone.Validation.bind(this);
        },

        addFilm: function() {
            this.model.set({
                name: this.ui.filmName.val(),
                year: this.ui.filmYear.val()
            });

            var result = this.model.validate();

            if (result) {
                alert(_.values(result).join("\n"));
                return false;
            }

            this.collection.create({
                name: this.model.get("name"),
                year: '(' + this.model.get("year") + ')'
            }, { wait: true });

            this.clearFilmInputs();
        },

        clearFilmInputs: function() {
            this.ui.filmName.val('');
            this.ui.filmYear.val('');
        }
    });

    return FilmManager;
});
