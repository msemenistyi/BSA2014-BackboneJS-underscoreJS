define([
    'underscore',
    'thorax',
    'handlebars',
    'views/film-list-item',
    'views/films-empty-list',
    'text!templates/film-manager.handlebars',
    'text!templates/film-view.handlebars',
    'text!templates/no-film-view.handlebars'
], function(_, Thorax, Handlebars, FilmView, EmptyFilmView, template, filmTemplate, emptyFilmTemplate) {
    var FilmManager = Thorax.View.extend({
        name:     "film-manager",
        template: Handlebars.compile(template),

       /* ui: {
            addFilmButton: "#add-film-button",
            filmName     : "#film-name-input",
            filmYear     : "#film-year-input",
            alertBlock   : ".alert",
            filmsList    : "#films-list"
        },

        events: {
            'click @ui.addFilmButton': 'addFilm'
        },*/

        initialize: function(options) {
            this.collection = options.collection;
            this.render();
        }

        /*addFilm: function() {
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
        }*/
    });

    return FilmManager;
});
