define(['underscore', 'backbone'], function(_, Backbone) {
    var FilmModel = Backbone.Model.extend({
        defaults: {
            name: null,
            year: null,
            poster: 'http://www.the-crazy-cat.com/wp-content/uploads/2013/06/Adorable-Kitten1-200x300.jpg'
        }
    });

    return FilmModel;
});
