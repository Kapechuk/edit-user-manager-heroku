define(['backbone'], function(Backbone) {
     var AlertModel = Backbone.Model.extend({
        defaults: {
            title: 'Warning!',
            message: 'changes has applied',
            errorInput : null,
            errorElId : null
        }
     });
     return AlertModel;
});
