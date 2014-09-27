define([
    'thorax',
    'handlebars',
    'text!templates/header.handlebars'
], function(Thorax, Handlebars, template) {
    var Header = Thorax.View.extend({
        name:     "header",
        template: Handlebars.compile(template)
    });

    return Header;
});
