 define(['backbone', 'app'], function(Backbone, App) {
    var UserModel = Backbone.Model.extend({
        initialize: function() {
            this.on('invalid', function(model, error) {
                console.log(error);
                App.vent.trigger('show:alert', error, null, 'error');
            })
        },
        urlRoot: "/items/",
        setUrl: function(id) {
            this.url = this.urlRoot + id;
        },
        defaults: {
            firstName: 'no name',
            lastName: 'no last name',
            email: 'no email',
            age: 'no age',
            dateOfBirth: 'no date of birth',
            adress: 'no adress',
            city: 'no city',
            country: 'no country'
        },
        validate: function(attr, options) {
            var errorArr = [];

            for(var key in attr){
                if(attr[key] === ''){
                    errorArr.push(key);
                };
            };

            if(errorArr.length > 0 ){
                var errorObjArr = [];
                $('.error').removeClass('error');
                for (var i = 0; i < errorArr.length; i++) {
                    $('#' + errorArr[i]).parent().addClass('error');
                    var inputName = $('#' + errorArr[i]).attr('placeholder');
                    errorObjArr.push(
                        {
                            title: 'Error!',
                            message: 'Please fill ' + inputName + ' field!',
                            errorInput : $('#' + errorArr[i]),
                            errorElId : errorArr[i]
                        }
                    );
                }
                return errorObjArr;
            };
           /* var emailPattern = new RegExp('^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\\.)+[a-z]{2,6}$');*/
        }
    });

     return UserModel;

 });
