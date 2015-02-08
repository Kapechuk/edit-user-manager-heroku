define([
    'backbone',
    'text!templates/alertsListTemplate.html',
    'modules/alert/views/alertView'
    ],

function(Backbone, AlertsListTemplate, AlertView) {
    var AlertsView = Backbone.View.extend({

        template: _.template( AlertsListTemplate ),
        render: function(options) {
            this.$el.empty();
            this.status = (options && options.status) ? options.status : 'warning';
            this.$el.html(this.template({status: this.status}));
            this.collection.each( function (alert) {
                 var alertView = new AlertView({model: alert});
                 this.$('.alert-list').append(alertView.render().el);
            }, this);
            this.$(".alert").alert();
            return this;
        },

        closeAlert : function() {
            this.$(".alert").alert('close');
        }
    });

    return AlertsView;
});   