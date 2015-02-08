define([
    'backbone',
    'app',
    'modules/alert/controllers/alertController',
    'collections/userCollection',
    'models/userModel',
    'views/modalView',
    'views/userView',
    'views/layoutView',
    'views/editFormView'

],function (Backbone, App, AlertController, UserCollection, UserModel, ModalView, UserViewsObj, LayoutView, EditUserFormView)
{
    var MainAppController = function (){
        var self = this;
        self.usersCollection = null;
        self.usersView = null;
        self.layoutView = null;
        self.addUserFormView = null;
        self.editUserFormView = null;

        var init = function (){
            self.usersCollection = new UserCollection();
            self.layoutView = new LayoutView();
            self.closeButton = new UserViewsObj.CloseButtonView();
            self.editUserFormView = new EditUserFormView();
            self.usersView = new UserViewsObj.UsersView({
                collection : self.usersCollection
            });
            self.addHandlers();
        };


        self.showMainPage = function () {
            if (self.addUserFormView || self.editUserFormView){
                $('.main-content').empty();
            }

            $('.main-content').empty();
            if(self.layoutView.el.childNodes.length != 0){
                self.layoutView.remove();
            }
            $('.main-content').append(self.layoutView.render().el);
            $('.user-list').empty();

            self.usersView.setElement('.user-list');
            self.usersCollection.reset();
            self.usersCollection.fetch();
            self.layoutView.sortBy({target: $('.first-name-sorter')});
        };

        self.showEditFormId = function(id) {
            var model = new UserModel();
            self.editUserFormView.remove();
            model.setUrl(id);
            model.fetch().done(function () {
                $('.main-content').empty();
                self.editUserFormView = new EditUserFormView({model: model});
                $('.main-content').append(self.editUserFormView.render().el);
            });

        };

        self.showAddForm = function () {

            $('.main-content').empty();
            self.editUserFormView = new EditUserFormView();
            $('.main-content').append(self.editUserFormView.render().el);

        };

        self.showAlertMessage = function(alert, delay, status) {
              App.vent.trigger('show:alert', alert, delay, status);
        };

        this.inputsConditionObj = {
             firstName : null,
             lastName : null,
             email : null,
             age : null,
             dateOfBirth : null,
             adress : null,
             city  : null,
             country  : null
        };

        self.addHandlers = function() {
            App.vent.on('remove:user', self.deleteModel, this);
        };


        self.deleteModel = function(modalModel) {
            var modalView = new ModalView({model: modalModel});
            $('.main-content').append(modalView.render().el);
        };

        init();
    }
    return MainAppController;
});