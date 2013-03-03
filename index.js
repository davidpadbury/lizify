var fs = require('fs'),
    path = require('path'),
    faced = new (require('faced')),
    Canvas = require('canvas');

// Get liz first
var lizData = fs.readFileSync(path.join(__dirname, 'liz.jpg')),
    lizImg = new Canvas.Image;

lizImg.src = lizData;


function lizify(source, destination, callback) {
    fs.readFile(source, function(err, data) {
        if (err) { callback(err); return; }

        faced.detect(source, function(faces) {

            var img = new Canvas.Image;

            img.src = data;

            var resultCanvas = new Canvas(img.width, img.height),
                resultCtx = resultCanvas.getContext('2d');

            resultCtx.drawImage(img, 0, 0, img.width, img.height);

            faces.forEach(function(face) {
                resultCtx.drawImage(lizImg, face.x, face.y, face.width, face.height);
            });

            var jpgStream = resultCanvas.jpegStream();

            jpgStream.pipe(fs.createWriteStream(destination));
            jpgStream.on('end', function() {
                callback(null);
            });
        });
    });
}

module.exports = lizify;
