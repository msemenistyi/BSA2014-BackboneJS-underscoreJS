define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/no-film-view.html'
], function($, _, Backbone, template) {
    var FilmsEmptyListView = Backbone.View.extend({
        template: _.template(template),
        className: "row",

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    return FilmsEmptyListView;
});
