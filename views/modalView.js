define(['backbone', 'text!templates/modalTemplate.html', 'backboneModal', 'app'],
function(Backbone, modalTemplate, backboneModal, App) {
      var ModalView = Backbone.Modal.extend({
            tagName: 'div',
            className: 'modal-box',
            cancelEl: '.cancelButton',
            template: _.template(modalTemplate),
            events: {
                'click .deleteUserModel' : 'DeleteUser'
            },
            DeleteUser: function() {
                this.model.destroy();
                 App.vent.trigger('change:route', '', { trigger:true });
                 App.vent.trigger('show:alert', {
                      title: 'Success!',
                      message: 'User has been remove successfully',
                 }, 5000, 'success');
            }
      });
      return ModalView;
});