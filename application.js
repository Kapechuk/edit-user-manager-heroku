define(['app', 'backbone', 'controller/mainAppController', 'routes/userRouter', 'modules/alert/controllers/alertController'],
function (App, Backbone, MainAppController, UserRouter, AlertController) {
    App = _.extend (App || {}, {

        vent : _.extend(this.vent || {}, Backbone.Events),

        start : function () {
            this.mainAppController = new MainAppController();
            this.alertController = new AlertController();
            this.userRouter = new UserRouter();

            if (Backbone.history) {
                Backbone.history.start();
            }
        }
    });

    return  App;
});