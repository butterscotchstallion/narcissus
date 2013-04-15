/**
 * Cam tests
 *
 */
'use strict';
define('CamTests', ['cam'], function (cam) {
    module('Basic functionality');
    
    test('should set all cfg options', function () {
        var expectedCfg = {
            delay           : 5000,
            video           : 'video',
            canvas          : 'canvas',
            countdown       : 'countdown',
            photoModal      : 'photoModal',
            photoModalArea  : 'photoModalArea',
            initializeCamera: false,
            debug           : true
        };
        
        var cfg = cam.init(expectedCfg);
        
        deepEqual(cfg, expectedCfg);
        strictEqual(cfg.delay, 5000);
        strictEqual(cfg.video, 'video');
        strictEqual(cfg.canvas, 'canvas');
        strictEqual(cfg.countdown, 'countdown');
        strictEqual(cfg.photoModal, 'photoModal');
        strictEqual(cfg.photoModalArea, 'photoModalArea');        
        strictEqual(cfg.initializeCamera, false);
        strictEqual(cfg.debug, true);
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
});