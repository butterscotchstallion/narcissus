/**
 * cam.js - provides an easy to use interface to capture still images
 * using HTML5 video API
 *
 */
define('cam', ['underscore', 'bootstrap'], function (_) {
    
    var cam = { 
        cfg: {
            debug           : false,
            delay           : 0,
            video           : undefined,
            canvas          : undefined,
            countdown       : undefined,
            photoModal      : undefined,
            photoModalArea  : undefined
        }
    };
    
    cam.videoCaptureErrorCallback = function (error) {
        console.log("Video capture error: ", error.code); 
    };
    
    cam.initializeCamera = function () {
        var videoObj      = { 'video': true };
        var errorCallback = cam.videoCaptureErrorCallback;
        
        // Non-webkit
        if (navigator.getUserMedia) {                    
            navigator.getUserMedia(videoObj, function (stream) {
                video.src = stream;
                video.play();

            }, errorCallback);
            
        } else if (navigator.webkitGetUserMedia) { 
            navigator.webkitGetUserMedia(videoObj, function(stream){
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();

            }, errorCallback);
        }
    };
    
    cam.takePhoto = function (cfg) {
        cam.applyConfiguration(cfg);        
        cam.log('Taking photo with delay: ' + cam.cfg.delay);
        
        var storeImageCallback = function () {
            cam.cfg.photoModal.modal('show');
        };
        
        if (cam.cfg.delay > 0) {
            cam.startCountdown(cam.cfg.delay / 1000, function () {
                cam.storeImage(storeImageCallback);
            });
        } else {
            cam.storeImage(storeImageCallback);
        }
    };
    
    cam.applyConfiguration = function (cfg) {
        // Merge configs
        cam.cfg = _.extend(cam.cfg, cfg);
    };    
    
    cam.storeImage = function (storeImageCallback) {
        var context   = cam.cfg.canvas.getContext('2d');
        context.drawImage(cam.cfg.video, 0, 0, 640, 480);
        
        var img       = cam.convertCanvasToImage(cam.cfg.canvas);
        var photoArea = cam.cfg.photoModalArea;
        
        photoArea.find('img').remove();
        photoArea.append(img);
        
        storeImageCallback();
    };
    
    cam.startCountdown = function (seconds, countdownCallback) {
        var counter = window.setInterval(function () {
            seconds--;
            
            cam.cfg.countdown.text(seconds);
            
            if (seconds <= 0) {
                // Clear counter
                window.clearInterval(counter);
                
                // Clear countdown text
                cam.cfg.countdown.text('');
                
                // Execute callback
                countdownCallback();
                
                return;
            }
            
        }, 1000);           
    };
    
    cam.convertCanvasToImage = function (canvas) {
        var image = new Image();
        image.src = canvas.toDataURL("image/png");
        
        return image;
    };
    
    cam.log = function (msg) {
        if (cam.cfg.debug) {
            console.log(msg);
        }
    };
    
    return {
        takePhoto: cam.takePhoto,
        initialize: cam.initializeCamera,
        cfg: cam.cfg
    };

});