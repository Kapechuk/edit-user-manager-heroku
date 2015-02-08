define([
    'backbone',
    'app',
    'modules/alert/collections/alertCollection',
    'modules/alert/views/alertsView',
    'bootstrap'
    ],

function(Backbone, App,  AlertCollection, AlertsView) {
    var AlertController = function() {
         this.timer = null;
         this.alertCollection = null;
         this.alertsView = null;
         this.options = {
            el : 'alert-container'
         };

         this.init = function() {
            this.addHandlers();
            this.alertCollection = new AlertCollection();
            this.alertsView = new AlertsView({
                collection : this.alertCollection
            });
            if(!$('.' + this.options.el).length){
                $('<div>').addClass(this.options.el).appendTo($('body'));
            };
         };

         this.showAlert = function(alert, delay, status) {
                this.alertCollection.reset();
                this.alertCollection.add(alert);
                this.alertsView.setElement('.' + this.options.el);
                this.alertsView.render({status:status});
                if (delay){
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function () {
                        this.alertsView.closeAlert();
                    }.bind(this), delay)
                } else {
                    clearTimeout(this.timer);
                };
         };

         this.removeAlerts = function() {
             $('.alert').remove();
         };

         this.addHandlers = function() {
              App.vent.on('remove:alerts', this.removeAlerts, this);
              App.vent.on('show:alert', this.showAlert, this);
         };

         this.init();
    };

    return AlertController;
});