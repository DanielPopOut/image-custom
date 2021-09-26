import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
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
  selectedItem,
  updateElementStyle,
}: {
  addNewItem: (textItemProps: TextItemProps) => void;
  deleteItem: () => void;
  selectedItem: string;
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

      {selectedItem && (
        <>
          <IconButton
            name='IconTrash'
            title='Delete element'
            onClick={deleteItem}
          />

          <IconButtonSelect
            value='center'
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
        </>
      )}
    </div>
  );
};
