import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
} from '@tabler/icons';
import { ObjectId } from 'bson';
import { CSSProperties, useContext } from 'react';
import { IconButton } from '../../../../shared/IconsSelector/IconButton';
import { IconButtonSelect } from '../../../../shared/IconsSelector/IconButtonSelect';
import { TextItemProps } from '../../../models/template.model';
import { getDefaultText } from '../defaultInitialData';
import { PageContext } from '../PageContext';

export const ActionBar = ({
  addNewItem,
  deleteItem,
  selectedItemStyle,
  updateElementStyle,
}: {
  addNewItem: (textItemProps: TextItemProps) => void;
  deleteItem: () => void;
  selectedItemStyle: CSSProperties;
  updateElementStyle: (data: Partial<CSSProperties>) => void;
}) => {
  const { sheetPosition } = useContext(PageContext);
  return (
    <div style={{ height: 30, marginBottom: 10, display: 'flex' }}>
      <IconButton
        name='IconWriting'
        title='New text'
        onClick={() => {
          addNewItem({
            id: new ObjectId().toHexString(),
            ...getDefaultText({
              text: 'New text',
              left: sheetPosition.width / 2,
              top: sheetPosition.height / 2,
            }),
          });
        }}
      />

      {selectedItemStyle && (
        <>
          <IconButton
            name='IconTrash'
            title='Delete element'
            onClick={deleteItem}
          />

          <IconButtonSelect
            value={selectedItemStyle.textAlign || 'start'}
            items={[
              { Icon: <IconAlignLeft />, value: 'start' },
              { Icon: <IconAlignCenter />, value: 'center' },
              { Icon: <IconAlignJustified />, value: 'justify' },
              { Icon: <IconAlignRight />, value: 'end' },
            ]}
            onChange={(value) => {
              updateElementStyle({ textAlign: value } as CSSProperties);
            }}
          />

          <IconButtonSelect
            value={selectedItemStyle.justifyContent || 'start'}
            items={[
              { Icon: <IconLayoutAlignLeft />, value: 'start' },
              { Icon: <IconLayoutAlignCenter />, value: 'center' },
              { Icon: <IconLayoutAlignRight />, value: 'end' },
            ]}
            onChange={(value) => {
              updateElementStyle({ justifyContent: value } as CSSProperties);
            }}
          />

          <IconButtonSelect
            value={selectedItemStyle.alignItems || 'start'}
            items={[
              { Icon: <IconLayoutAlignTop />, value: 'start' },
              { Icon: <IconLayoutAlignMiddle />, value: 'center' },
              { Icon: <IconLayoutAlignBottom />, value: 'end' },
            ]}
            onChange={(value) => {
              updateElementStyle({ alignItems: value } as CSSProperties);
            }}
          />
        </>
      )}
    </div>
  );
};
