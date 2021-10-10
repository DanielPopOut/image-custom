type PaletteItem = {
  color: string;
  offset: string;
  opacity: number;
};

export type PaletteAndAngleState = {
  colors: PaletteItem[];
  angle: number;
};
export class ColorUtils {
  createHexWithAlpha = (hex: string, alphaValue: number) => {
    let alphaValueInHex = '';
    if (alphaValue) {
      alphaValueInHex = (alphaValue * 255)
        .toString(16)
        .padStart(2, '0')
        .substr(0, 2);
    }
    return hex + alphaValueInHex;
  };

  hexToRGBA = (hex: string = '') => {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    const alphaPart = hex.slice(7, 9);
    let alphaValue = 1;
    if (alphaPart) {
      alphaValue = parseInt(alphaPart, 16) / 255;
    }

    return { r, g, b, a: alphaValue };
  };

  rgbValuesToRgbString = ({ r, g, b }) => {
    return `rgb(${r}, ${g}, ${b})`;
  };

  rgbToRgba = (rgb: string, a = 1) =>
    rgb.replace('rgb(', 'rgba(').replace(')', `, ${a})`);

  toHex = (number: number) => number.toString(16).padStart(2, '0');
  rgbToHex = (rgb: string) => {
    const rgbValues = rgb.replace('rgb(', '').replace(')', '');
    const rgbHex = rgbValues
      .split(',')
      .map((item) => this.toHex(+item))
      .join('');
    return '#' + rgbHex;
  };
  rgbToHexWithAlpha = (rgb: string, opacity: number) => {
    const hex = this.rgbToHex(rgb);
    return this.createHexWithAlpha(hex, opacity);
  };

  convertOneGradientColorToPaletteElement = (gradientColor: string) => {
    const [colorHexWithAlpha, offset] = gradientColor.split(' ');
    if (colorHexWithAlpha) {
      const { r, g, b, a } = this.hexToRGBA(colorHexWithAlpha);
      const offSetWithoutPercentage = offset.replace('%', '');
      return {
        color: this.rgbValuesToRgbString({ r, g, b }),
        offset: +offSetWithoutPercentage ? +offSetWithoutPercentage / 100 : 0,
        opacity: a,
      };
    }
    return null;
  };

  linearGradientToPalette = (
    linearGradientString: string, // format linear-gradient(100deg, #BFUOEBOEA offset, #ouefbio offsetValue)
  ): PaletteAndAngleState => {
    if (!linearGradientString) {
      return null;
    }
    const linearGradientValuesString = linearGradientString.match(/\((.*)\)/);
    if (!linearGradientValuesString) {
      return null;
    }
    const linearGradientValues = linearGradientValuesString[1]
      .split(',')
      .map((item) => item.trim());
    let angle = 90;
    let palette = [];
    const firstElement = linearGradientValues.shift();
    if (!firstElement.includes('#')) {
      angle = +firstElement.match(/\d+/)[0];
      if (linearGradientValues.length < 2) {
        return null;
      }
    } else {
      palette.push(this.convertOneGradientColorToPaletteElement(firstElement));
    }

    linearGradientValues.forEach((item) =>
      palette.push(this.convertOneGradientColorToPaletteElement(item)),
    );

    return { colors: palette, angle };
  };

  generateLinearGradientFromPaletteAndAngle = (
    paletteData: PaletteAndAngleState,
  ) => {
    return `linear-gradient(${paletteData.angle}deg, ${paletteData.colors
      ?.map((color) =>
        [
          this.rgbToHexWithAlpha(color.color, color.opacity),
          (+color.offset * 100).toFixed(0) + '%',
        ].join(' '),
      )
      .join(', ')})`;
  };
}

export const colorUtils = new ColorUtils();
