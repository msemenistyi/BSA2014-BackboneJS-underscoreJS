define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var FilmsEmptyListView = Backbone.View.extend({
        template: _.template($("#no-film-view-tpl").html()),
        className: "row",

        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });

    return FilmsEmptyListView;
});
