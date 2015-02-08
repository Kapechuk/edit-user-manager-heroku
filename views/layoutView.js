define(['backbone' , 'text!templates/layout.html', 'app'],
    function(Backbone, layoutTemplate, App){

        var LayoutView = Backbone.View.extend({
            tagName: 'div',
            className: 'container-fluid',
            template: _.template(layoutTemplate),
            initialize: function() {

            },
            events: {
                 'click strong' : 'sortBy'
            },
            sortBy: function(e) {
                if($(e.target).data('sort') === 'reverse'){
                    App.vent.trigger('click:strong', $(e.target).prop('className'));
                    $(e.target).data('sort', 'direct');
                } else {
                    App.vent.trigger('click:strong', $(e.target).prop('className'));
                    $(e.target).data('sort', 'reverse');
                };

            },
            render: function() {
                this.$el.html( this.template() );
                this.delegateEvents();
                return this;
            }
        });

        return  LayoutView;
})