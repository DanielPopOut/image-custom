import {
  ImageItemProps,
  ShapeItemProps,
  SVGItemProps,
  TextItemProps,
} from '../../models/template.model';
import { shapeHelper } from './components/basics/shapes/shapeHelper';

const initialPageWidth = 400;

export const getDefaultText = (data: {
  text: string;
  top: number;
  left: number;
}) => {
  return {
    type: 'text',
    value: data.text,
    style: {
      display: 'flex',
      top: data.top,
      left: data.left,
      width: 300,
      height: 100,
      color: '#333333',
      fontSize: '16px',
    },
  } as Omit<TextItemProps, '_id'>;
};

export const getDefaultImage = (data: {
  imagePath?: string;
  top: number;
  left: number;
}) => {
  return {
    type: 'image',
    style: {
      backgroundImage: `url(${data.imagePath || '/default_image.png'})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      top: data.top,
      left: data.left,
      width: 300,
      height: 100,
      color: '#333333',
      fontSize: '16px',
    },
  } as Omit<ImageItemProps, '_id'>;
};

export const defaultInitialData = {
  page: { width: '400px', height: '300px' },
  elements: {
    text1: {
      id: 'text1',
      ...getDefaultText({
        text: 'Hello boy',
        top: initialPageWidth / 2,
        left: initialPageWidth / 2,
      }),
    } as TextItemProps,
  },
};

export const getDefaultShape = (data: {
  shapeData: SVGItemProps;
  top: number;
  left: number;
}) => {
  return {
    type: 'shape',
    shapeData: data.shapeData,
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: data.top,
      left: data.left,
      width: 300,
      height: 100,
      color: '#333333',
      fontSize: '16px',
      ...shapeHelper.convertColorsToCSSVariables(data.shapeData.colors),
    },
  } as Omit<ShapeItemProps, '_id'>;
};
