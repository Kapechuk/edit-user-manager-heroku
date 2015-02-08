
require.config({
    baseUrl: './',
    paths: {
        'text': 'js/text',
        'backboneModal' : 'js/backbone.modal',
        'jquery': 'js/jquery-2.1.1.min',
        'underscore': 'js/underscore-min',
        'backbone': 'js/backbone-min',
        'bootstrap': 'js/bootstrap.min',
        'app' : 'app'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'bootstrap':{
            deps: ['jquery']
        },
        'jquery' : {
            exports: '$'
        },
        'backboneModal': {
            deps: ['underscore', 'backbone', 'bootstrap']
        }
    }
});

require(['application'],
    function (App ) {
        App.start();
    });