define([
    'thorax',
    'handlebars',
    'text!templates/film-detailed-view.handlebars'
], function(Thorax, Handlebars, template) {
    var FilmDetailsView = Thorax.View.extend({
        name:     'details',
        template: Handlebars.compile(template),

        initialize: function(options) {
            this.model = options.model;
            this.render();
        }
    });

    return FilmDetailsView;
});
