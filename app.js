define(['backbone'], function () {
    var App = function () {
        this.vent = _.extend(this.vent || {}, Backbone.Events);

        return this;
    };

    return  new App();
});