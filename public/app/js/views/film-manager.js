define([
    'underscore',
    'marionette',
    'views/film-list-item',
    'views/films-empty-list',
    'text!templates/film-manager.html'
], function(_, Marionette, FilmView, FilmsEmptyListView, template) {
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

        validationRules: {
            year: {
                min: 1895, // first Lumier brothers' film
                max: new Date().getFullYear()
            }
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
            var name = this.ui.filmName.val(),
                year = parseInt(this.ui.filmYear.val(), 10);

            var result = {
                name: name,
                year: year,
                errors: []
            };

            if (!name.length) {
                result.errors.push("Film's name should be not empty");
            }

            if (!(year >= this.validationRules.year.min
                && year <= this.validationRules.year.max)) {
                var yearErrorMessage = "Film's year should be in range (" +
                    this.validationRules.year.min +
                    ".." +
                    this.validationRules.year.max +
                    ")";
                result.errors.push(yearErrorMessage);
            }

            return result;
        },

        clearFilmInputs: function() {
            this.ui.filmName.val('');
            this.ui.filmYear.val('');
        }
    });

    return FilmManager;
});
