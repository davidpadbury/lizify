var lizify = require('../'),
    path = require('path'),
    fs = require('fs');

var imageExtensions = [ 'png', 'jpg' ];

var imageFiles = fs.readdirSync(__dirname).filter(isImage),
    resultsDir = path.join(__dirname, '..', 'results');

fs.mkdirSync(resultsDir);

console.log('results published in:', resultsDir);

imageFiles.forEach(function(imageFile) {
    var source = path.join(__dirname, imageFile),
        destination = path.join(resultsDir, imageFile);

    lizify(source, destination, function(err) {
        if (err) {
            console.error('error lizifying', imageFile, err);
        } else {
            console.log('lizified', imageFile);
        }
    });
});

function isImage(filename) {
    var cleanedExt = path.extname(filename).slice(1).toLowerCase();

    return imageExtensions.indexOf(cleanedExt) >= 0;
}
