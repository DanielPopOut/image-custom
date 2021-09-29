import { CSSProperties, HTMLAttributes } from 'react';

export class Template {
  _id: string;
  page: CSSProperties;
  elements: Record<string, ItemProps>;

  constructor({
    _id,
    page,
    elements,
  }: {
    _id: string;
    page: CSSProperties;
    elements: Record<string, ItemProps>;
  }) {
    this._id = _id;
    this.page = page;
    this.elements = elements;
  }

  getFontsToFetch = () => {
    const fontsToDownload = new Set();
    Object.values(this.elements).forEach((element) => {
      if (element.style.fontFamily) {
        fontsToDownload.add(element.style.fontFamily);
      }
    });
    return [...fontsToDownload] as string[];
  };

  getGoogleRequestForFonts = () => {
    const fontsToDownload = this.getFontsToFetch();
    if (fontsToDownload.length === 0) {
      return null;
    }
    const fontsParams = fontsToDownload
      .map((fontFamily) => {
        return `family=${fontFamily
          .split(' ')
          .join(
            '+',
          )}:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700`;
      })
      .join('&');

    return `https://fonts.googleapis.com/css2?${fontsParams}&display=swap`;
  };
}

export type ItemProps = TextItemProps | ImageItemProps;

export type ImageItemProps = {
  type: 'image';
} & DefaultItemProps;

export type TextItemProps = {
  type: 'text';
  value: string;
} & DefaultItemProps;

type DefaultItemProps = {
  id: string;
  style: TextItemStyleProps;
  isSelected?: boolean;
} & HTMLAttributes<HTMLDivElement>;

type TextItemStyleProps = {
  top?: number;
  left?: number;
  width?: number;
  height?: number;
  color?: CSSProperties['color'];
  textAlign?: CSSProperties['textAlign'];
};
