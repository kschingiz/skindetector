let Jimp = require("jimp");

class SkinDetector {
  constructor(props){
    this.props = props || {
      backColor: [0, 0, 0],
      primaryColor: [255, 255, 255]
    };
  }

  isSkin(r, g, b){
    let rgbClassifier = ((r > 95) && (g > 40 && g < 100) && (b > 20) && ((Math.max(r, g, b) - Math.min(r, g, b)) > 15) && (Math.abs(r - g) > 15) && (r > g) && (r > b));

    let sum = r + g + b;
    let nr = (r / sum),
      ng = (g / sum),
      nb = (b / sum),
      normRgbClassifier = (((nr / ng) > 1.185) && (((r * b) / (Math.pow(r + g + b, 2))) > 0.107) && (((r * g) / (Math.pow(r + g + b, 2))) > 0.112));

    let h = 0,
      mx = Math.max(r, g, b),
      mn = Math.min(r, g, b),
      dif = mx - mn;

    if (mx == r) {
      h = (g - b) / dif;
    } else if (mx == g) {
      h = 2 + ((g - r) / dif)
    } else {
      h = 4 + ((r - g) / dif);
    }
    h = h * 60;
    if (h < 0) {
      h = h + 360;
    }
    let s = 1 - (3 * ((Math.min(r, g, b)) / (r + g + b)));
    let hsvClassifier = (h > 0 && h < 35 && s > 0.23 && s < 0.68);

    return (rgbClassifier || normRgbClassifier || hsvClassifier);
  }

  scanImage(imagePath, callback){
    let self = this;

    Jimp.read(imagePath, function (err, image) {
      if(err){
        return callback(err, null);
      };

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        let red   = this.bitmap.data[ idx + 0 ];
        let green = this.bitmap.data[ idx + 1 ];
        let blue  = this.bitmap.data[ idx + 2 ];

        let newColor = self.props.backColor;
        if(self.isSkin(red, green, blue)){
          newColor = self.props.primaryColor;
        }
        this.bitmap.data[ idx + 0] = newColor[0];
        this.bitmap.data[ idx + 1 ] = newColor[1];
        this.bitmap.data[ idx + 2 ] = newColor[2];
      });

      callback(null, image);
    });
  }
}

module.exports = SkinDetector;
