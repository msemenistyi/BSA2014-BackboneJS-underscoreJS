define([
    'marionette',
    'text!templates/header.html'
], function(Marionette, template) {
    var Header = Marionette.ItemView.extend({
        className: 'container',
        template: _.template(template)
    });

    return Header;
});
