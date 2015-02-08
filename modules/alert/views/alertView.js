define(['backbone', 'bootstrap', 'text!templates/alertTemplate.html'],
function(Backbone, Bootstrap, alertTemplate) {

    var AlertView = Backbone.View.extend({
         tagName: 'li',
         className: 'alert-box',
         template: _.template(alertTemplate),
         events: {
            'click span' : 'setFocus'
         },
         setFocus : function() {
           this.model.get('errorInput').focus();
         },

         render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
         },
    });

    return AlertView;
});