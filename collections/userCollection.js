define(['backbone', 'models/userModel'],
    function (Backbone, UserModel) {
        var UsersCollection = Backbone.Collection.extend({
            model : UserModel,
            initialize: function(){
                var that = this;

                this.dfd = $.Deferred();
                this.on('sync', function (collection) {
                    that.dfd.resolve();
                });
            },
            url: '/items'
        });

        return UsersCollection;
    });
