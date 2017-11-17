# Skindetector

Npm package for image analysis and detecting skin pixels.

# Usage
```
npm i skindetector --save
```

```
let props = {
  backColor: [0,0,0]
  primaryColor: [255,255,255]
};

let skinDetector = require('skindetector')(props);

skinDetector.scanImage('../some/awesome/image.jpg', function(err, image){
  // image is the Jimp image instance, you can use it's API: https://github.com/oliver-moran/jimp
  // Skin pixels colored to primaryColor (255,255,255), otherwise to backColor(0,0,0)
  image.write('./skinned.jpg');
})
```
# Author
Kengessov Shynggys @kschingiz

# License
MIT
