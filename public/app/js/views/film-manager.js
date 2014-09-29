define([
    'underscore',
    'thorax',
    'handlebars',
    'views/film-list-item',
    'views/films-empty-list',
    'text!templates/film-manager.handlebars',
    'text!templates/film-view.handlebars',
    'text!templates/no-film-view.handlebars'
], function(_, Thorax, Handlebars, FilmView, EmptyFilmView, template) {
    var FilmManager = Thorax.View.extend({
        name:     "film-manager",
        template: Handlebars.compile(template),

        events: {
            'click #add-film-button': 'addFilm'
        },

        validationRules: {
            year: {
                min: 1895, // first Lumier brothers' film
                max: new Date().getFullYear()
            }
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.render();
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
                year = parseInt(this.$el.find("#film-year-input").val(), 10);

            var result = {
                name: name.replace(/^\s+/, '').replace(/\s+$/, ''),
                year: year,
                errors: []
            };

            if (!result.name.length) {
                result.errors.push("Film's name should be not empty");
            }

            if (!(result.year >= this.validationRules.year.min
                && result.year <= this.validationRules.year.max)) {
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
            this.$el.find("#film-name-input").val('');
            this.$el.find("#film-year-input").val('');
        }
    });

    return FilmManager;
});
