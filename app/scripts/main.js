/*global require*/
'use strict';

require.config({

    baseUrl: '../',

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        three: {
            exports: 'THREE'
        },
        terrainLoader: {
            deps: ['three'],
            exports: 'THREE'
        },
        trackballControls: {
            deps: ['three'],
            exports: 'THREE'
        }
    },
    paths: {
        jquery: 'bower_components/jquery/jquery',
        backbone: 'bower_components/backbone/backbone',
        underscore: 'bower_components/underscore/underscore',
        three: 'bower_components/threejs/build/three',
        terrainLoader: 'scripts/vendor/terrain-loader',
        trackballControls: 'scripts/vendor/trackball-controls'
    }
});

require([
    'scripts/viz/views/terrain'
], function (TerrainView, Backbone) {
    var terrainView = new TerrainView({
        el: '#container'
    });
});
