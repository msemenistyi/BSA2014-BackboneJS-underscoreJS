define(['underscore', 'backbone'], function(_, Backbone) {
    var FilmModel = Backbone.Model.extend({
        defaults: {
            name: null,
            year: null
        }
    });

    return FilmModel;
});
