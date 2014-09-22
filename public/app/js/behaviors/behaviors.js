define(['marionette'], function(Marionette) {
    window.Behaviors = {};

    Marionette.Behaviors.behaviorsLookup = function() {
        return window.Behaviors;
    };

    window.Behaviors.Highlighter = Marionette.Behavior.extend({
        events: {
            'mouseover @ui.filmItem': 'highlight',
            'mouseout @ui.filmItem':  'restore'
        },

        color: "",

        highlight: function() {
            var rgbColor = this.$el.find('.well').css('background-color');
            this.color = this._rgb2hex(rgbColor);
            this.$el.find('.well').css('background-color', this._randomColor());
        },

        restore: function() {
            this.$el.find('.well').css('background-color', this.color);
        },

        _rgb2hex: function(rgb) {
            rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            return "#" +
            ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
            ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
        },

        _randomColor: function() {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
    });

    return window.Behaviors;
});