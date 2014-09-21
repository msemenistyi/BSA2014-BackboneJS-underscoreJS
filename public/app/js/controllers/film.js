define(['app'], function(App) {
    return {
        showFilmsList: function() {
            App.vent.trigger("films:show");
        },

        showFilmDetails: function(id) {
            App.vent.trigger("film:details", id);
        }
    }
});