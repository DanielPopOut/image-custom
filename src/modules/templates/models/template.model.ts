import { CSSProperties, HTMLAttributes } from 'react';
import { stringHelper } from 'src/modules/shared/services/stringHelper';

class BasicTemplateData {
  page: CSSProperties;
  elements: Record<string, ItemProps>;
}

export class Template extends BasicTemplateData {
  _id: string;
  dateCreation?: string;
  creatorId?: string;
  version?: number;
  publishedVersion?: BasicTemplateData;
  publicationDate?: string;
  imageUrl?: string;
  history?: Array<{
    version: number;
    data: BasicTemplateData;
    publicationDate: string;
    imageUrl?: string;
  }>;

  constructor({
    _id,
    page,
    elements,
  }: {
    _id: string;
    page: CSSProperties;
    elements: Record<string, ItemProps>;
  }) {
    super();
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

  static generateDefaultQueryVariables = (template: Template) => {
    const allVariables = stringHelper.getValueToInterpolateInStringArray(
      Object.values(template.elements).map((element) => {
        if (element.type === 'text') {
          return element.value;
        }
        return '';
      }),
    );

    const queryObject = [...allVariables].reduce((finalObj, variable) => {
      finalObj[variable] = `VALUE_${variable.toUpperCase()}`;
      return finalObj;
    }, {} as Record<string, string>);

    return queryObject;
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
  zIndex?: number;
};
