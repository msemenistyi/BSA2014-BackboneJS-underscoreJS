define([
    'underscore',
    'marionette',
    'text!templates/no-film-view.html'
], function(_, Marionette, template) {
    var FilmsEmptyListView = Marionette.ItemView.extend({
        template: _.template(template),
        className: "row",
        tagName: "div"
    });

    return FilmsEmptyListView;
});
