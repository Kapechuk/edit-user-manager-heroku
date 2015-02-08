define(['backbone', 'app', 'models/userModel', 'text!templates/EditUserFormTemplate.html', 'text!templates/addUserFormTemplate.html'],
    function(Backbone, App, UserModel, EditUserFormTemplate, addUserFormTemplate){
     var EditUserFormView = Backbone.View.extend({
         tagName: 'form',
         className: 'editUserForm',
         templateEdit: _.template(EditUserFormTemplate),
         templateAdd: _.template(addUserFormTemplate),

         events: {
             'click .submit-edit'  :  'saveChanges',
             'click .submit-add'   :  'saveNewModel',
             'click .delete'       :  'deleteModel',
             'click .cancel'       :  'removeAlerts'
         },

         deleteModel: function() {
             App.vent.trigger('remove:user', this.model);
         },

         removeAlerts: function() {
            App.vent.trigger('remove:alerts');
         },

         saveNewModel: function() {
             var firstName = $('#firstName').val();
             var lastName = $('#lastName').val();
             var email = $('#email').val();
             var age = $('#age').val();
             var dateOfBirth = $('#dateOfBirth').val() ;
             var adress = $('#adress').val();
             var city  = $('#city').val();
             var country  = $('#country').val();
             debugger;
             var model = new UserModel({
                 firstName: firstName,
                 lastName: lastName,
                 email: email,
                 age: age,
                 dateOfBirth: dateOfBirth,
                 adress: adress,
                 city: city,
                 country: country
             });

             model.save({},{success: function() {
                 App.vent.trigger('change:route', 'items', { trigger:true });
                 App.vent.trigger('show:alert', {
                     title: 'Success!',
                     message: 'User has been created successfully'
                 }, 5000, 'success');
             }});
         },


         saveChanges: function() {
            this.removeAlerts();
            var inputsObj = App.mainAppController.inputsConditionObj;
            var errorAlertsArr = [];
            var warningAlertsArr = [];

            for(var item in inputsObj){
                inputsObj[item] = $('#' + item).val();
            }

            for (var key in inputsObj) {

                if(inputsObj[key] !== ''){
                    if(inputsObj[key] != this.model.get( key.toString() )) {
                        console.log(key);
                    } else {
                       warningAlertsArr.push(key);
                    };
                } else {
                     errorAlertsArr.push(key);
                }
            };

            if(errorAlertsArr.length > 0){
                var errorObjArr = []
                $('.error').removeClass('error');
                for (var i = 0; i < errorAlertsArr.length; i++) {
                    $('#' + errorAlertsArr[i]).parent().addClass('error')
                    var inputName = $('#' + errorAlertsArr[i]).prev().html();
                    errorObjArr.push(
                        {
                            title: 'Error!',
                            message: 'Please fill ' + inputName + ' field!',
                            errorInput : $('#' + errorAlertsArr[i]),
                            errorElId : errorAlertsArr[i]
                        }
                    );
                }
                App.vent.trigger('show:alert', errorObjArr, null, 'error');
            } else if (warningAlertsArr.length == 8) {
                  App.vent.trigger('show:alert', {
                      title: 'Warning!',
                      message: 'There is nothing to update'
                  }, 5000, 'warning')
            } else {
                this.model.save({
                    firstName: inputsObj.firstName,
                    lastName: inputsObj.lastName,
                    email: inputsObj.email,
                    age: inputsObj.age,
                    dateOfBirth: inputsObj.dateOfBirth,
                    adress: inputsObj.adress,
                    city: inputsObj.city,
                    country: inputsObj.country},{success: function() {
                        App.vent.trigger('change:route', 'items', { trigger:true });
                        App.vent.trigger('show:alert', {
                           title: 'Success!',
                           message: 'User has been update successfully'
                        }, 5000, 'success');
                }});

            };
         },
         render: function() {
             if(this.model){
                this.$el.html( this.templateEdit( this.model.toJSON() ) );
             } else {
                this.$el.html( this.templateAdd() );
             };
             return this;
         }

     });
     return EditUserFormView;
});