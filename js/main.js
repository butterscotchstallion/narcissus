

require.config({
    baseUrl: "/js",
    
    // don't cache me bro
    urlArgs: "bust=" + (new Date()).getTime(),
    
    paths: {
        // Libs
        bootstrap     : 'lib/bootstrap.min',
        underscore    : 'lib/underscore.min',
        
        // App
        cam           : 'app/cam'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

var deps = [
    'jquery',
    'cam'
];

require(deps, function($, cam) {

    $(function() {
        // Ask permission to use camera
        cam.initialize();
        
        
        
        $('#takePhoto').on('click', function (e) {
            cam.takePhoto({
                delay           : $('input:radio[name=delay]:checked').val(),
                video           : $('#video')[0],
                canvas          : $('#canvas')[0],
                countdown       : $('#countdown'),
                photoModal      : $('#photo-modal'),
                photoModalArea  : $('#modal-photo-area'),
                debug           : true
            });
        });
        
        var videoEl = $('#video');
        
        // Handle effects
        $('.effect').on('click', function () {
            var effectClass = $(this).prop('id');
            
            console.log('toggling effect: ' + effectClass);
            
            videoEl.toggleClass(effectClass);
        });
    });
    
});
