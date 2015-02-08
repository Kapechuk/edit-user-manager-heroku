define(['backbone', 'text!templates/userTemplate.html','app', 'views/modalView'],
    function (Backbone, userTemplate, App, ModalView) {

    var UserView = Backbone.View.extend({

        events: {
            'click .showUser' : 'showCurrentUser',
            'click .removeUser' : 'removeCurrentUser'
        },
        showCurrentUser: function() {
             App.vent.trigger('change:route', 'items/' + this.model.get('id'), { trigger:true });
        },

        removeCurrentUser: function() {
            App.vent.trigger('remove:user', this.model);
        },
        className: 'row-fluid user',
        template: _.template(userTemplate),
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });

    var UsersView = Backbone.View.extend({
        el : '.user-list',

        initialize: function () {
            var that = this;
            this.collection.on('sync', function () {
                that.render();
            })
            App.vent.on('click:strong', this.sortCollectionBy, this);
        },
        sortCollectionBy: function(className) {
            switch(className) {
                case 'first-name-sorter':
                    if($('.' + className).data('sort') === 'reverse'){
                        $('i').removeClass();
                        $('#firstNameIcon').addClass('icon-chevron-up');

                        this.collection.comparator = function (user) {
                            var str = user.get("firstName");
                            str = str.toLowerCase();
                            str = str.split("");
                            str = _.map(str, function(letter) {
                                return String.fromCharCode(-(letter.charCodeAt(0)));
                            });
                            return str;
                            };
                    } else {
                        $('i').removeClass();
                        $('#firstNameIcon').addClass('icon-chevron-down');

                        this.collection.comparator = function(user){
                            return user.get('firstName');
                        };
                    };
                    break;
                case 'last-name-sorter':
                    if($('.' + className).data('sort') === 'reverse'){
                        $('i').removeClass();
                        $('#lastNameIcon').addClass('icon-chevron-up');

                        this.collection.comparator = function (user) {
                            var str = user.get("lastName");
                            debugger;
                            str = str.toLowerCase();
                            str = str.split("");
                            str = _.map(str, function(letter) {
                                return String.fromCharCode(-(letter.charCodeAt(0)));
                            });
                            return str;
                            };
                    } else {
                        $('i').removeClass();
                        $('#lastNameIcon').addClass('icon-chevron-down');

                        this.collection.comparator = function(user){
                            return user.get('lastName');
                        };
                    };
                    break;
                case 'e-mail-sorter' :
                    if($('.' + className).data('sort') === 'reverse'){
                        $('i').removeClass();
                        $('#emailIcon').addClass('icon-chevron-up');

                        this.collection.comparator = function (user) {
                            var str = user.get("email");
                            debugger;
                            str = str.toLowerCase();
                            str = str.split("");
                            str = _.map(str, function(letter) {
                                return String.fromCharCode(-(letter.charCodeAt(0)));
                            });
                            return str;
                            };
                    } else {
                        $('i').removeClass();
                        $('#emailIcon').addClass('icon-chevron-down');

                        this.collection.comparator = function(user){
                            debugger;
                            return user.get('email');
                        };
                    };
                    break;
                default:
                    return;
                    break;
            }

            this.collection.sort();
            this.render();
        },

        render: function () {
            this.$el.empty();
            this.collection.each(function (user, index) {
                var userView = new UserView({model: user});
                this.$el.append(userView.render().el);
            }, this);

            return this;
        }
    });

    var CloseButtonView = Backbone.View.extend({
        tagName: 'a',
        className: 'btn newUser',
        render: function () {
            this.$el.html('New User').attr('href', '#new');

            return this;
        }
    });


    return {
        UserView: UserView,
        UsersView: UsersView,
        CloseButtonView: CloseButtonView
    };
});
