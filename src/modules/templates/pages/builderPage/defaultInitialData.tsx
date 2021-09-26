import { TextItemProps } from '../../models/template.model';

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
      color: 'black',
    },
  };
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
