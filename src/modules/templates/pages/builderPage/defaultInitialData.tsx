import { TextItemProps } from '../../models/template.model';

const initialPageWidth = 400;
export const defaultInitialData = {
  page: { width: '400px', height: '300px' },
  elements: {
    text1: {
      id: 'text1',
      type: 'text',
      value: 'Hello Daniel',
      style: {
        display: 'flex',
        top: initialPageWidth / 2,
        left: initialPageWidth / 2,
        width: 300,
        height: 100,
        color: 'black',
      },
    } as TextItemProps,
  },
};
