export const createHexWithAlpha = (hex: string, alphaValue: number) => {
  let alphaValueInHex = '';
  if (alphaValue) {
    alphaValueInHex = (alphaValue * 255)
      .toString(16)
      .padStart(2, '0')
      .substr(0, 2);
  }
  return hex + alphaValueInHex;
};
