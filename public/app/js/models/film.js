define([
    'underscore',
    'thorax',
    'memento'
], function(_, Thorax, Memento) {
    var FilmModel = Thorax.Model.extend({
        defaults: {
            name: null,
            year: null,
            poster: 'http://www.the-crazy-cat.com/wp-content/uploads/2013/06/Adorable-Kitten1-200x300.jpg'
        },

        initialize: function() {
            _.extend(this, new Memento(this));
        }
    });

    return FilmModel;
});
