define(['underscore', 'backbone', 'memento'], function(_, Backbone) {
    var FilmModel = Backbone.Model.extend({
        defaults: {
            name: null,
            year: null,
            poster: 'http://www.the-crazy-cat.com/wp-content/uploads/2013/06/Adorable-Kitten1-200x300.jpg'
        },

        validation: {
            name: {
                required: true
            },

            year: {
                required: true,
                range: [1895, new Date().getFullYear()]
            }
        },

        initialize: function() {
            _.extend(this, new Backbone.Memento(this));
        }
    });

    return FilmModel;
});
