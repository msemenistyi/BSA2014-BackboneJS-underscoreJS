define([
    'marionette',
    'text!templates/film-detailed-view.html'
], function(Marionette, template) {
    var FilmDetailsView = Marionette.ItemView.extend({
        template: _.template(template)
    });

    return FilmDetailsView;
});
