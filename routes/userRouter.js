define(['backbone', 'app'],
    function(Backbone, App) {

    var UserRouter = Backbone.Router.extend({
        initialize: function() {
            this.addHandlers();
        },
        routes: {
            ''         : 'showItems',
            'items'    : 'showItems',
            'listClose': 'closeList',
            'new'      : 'addUserForm',
            'items/(:id)' : 'editUserForm',
            '*err'     : 'errorMessage'

        },
        errorMessage: function() {
            this.showItems();
        },

        showItems: function() {
            App.mainAppController.showMainPage();
            this.navigate('items');
        },
        addUserForm: function() {
            App.mainAppController.showAddForm();
        },
        editUserForm: function(id) {
            App.mainAppController.showEditFormId(id);
        },

        closeList: function() {
            $('.user-list').remove();
        },

        getCurrentRoute : function () {
            return Backbone.history.fragment;
        },

        navigateTo : function (route, options) {
            options = options || {};

            this.navigate(route, options);
        },

        addHandlers : function () {
            App.vent.on('change:route', this.navigateTo.bind(this));
        }
    });
   return UserRouter;
});
