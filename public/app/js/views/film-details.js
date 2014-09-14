define([
    'jquery',
    'underscore',
    'backbone',
    'models/film',
    'text!templates/film-detailed-view.html'
], function($, _, Backbone, FilmModel, template) {
    var FilmDetailsView = Backbone.View.extend({
        el:       $("#content"),
        template: _.template(template),

        initialize: function(options) {
            this.model = new FilmModel();
            this.model.url = options.detailsUrl;
        },

        render: function() {
            var that = this;

            this.model.fetch({
                success: function(model, response) {
                    that.$el.html(that.template({film: model.toJSON()}));
                }
            });
        }
    });

    return FilmDetailsView;
});
