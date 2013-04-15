
'use strict';

require.config({
    baseUrl: "../",
    
    // don't cache me bro
    urlArgs: "bust=" + (new Date()).getTime(),
    
    paths: {
        // Libs
        bootstrap     : 'lib/bootstrap.min',
        underscore    : 'lib/underscore.min',
        
        // App
        cam          : './app/cam',
        
        // Tests
        CamTests     : './test/resources/tests/CamTests'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['CamTests']);
