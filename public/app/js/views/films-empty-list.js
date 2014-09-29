define([
    'thorax',
    'handlebars',
    'text!templates/no-film-view.handlebars'
], function(Thorax, Handlebars, template) {
    var FilmsEmptyListView = Thorax.View.extend({
        name: 'empty-list',
        template: Handlebars.compile(template)
    });

    return FilmsEmptyListView;
});
