define(['backbone', 'modules/alert/models/alertModel'], function(Backbone, AlertModel) {
     var AlertCollection = Backbone.Collection.extend({
         model: AlertModel,
     });

     return AlertCollection;
});