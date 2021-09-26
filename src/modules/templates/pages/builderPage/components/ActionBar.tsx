import { ObjectId } from 'bson';
import { useContext } from 'react';
import { IconButton } from '../../../../shared/IconsSelector/IconButton';
import { TextItemProps } from '../../../models/template.model';
import { getDefaultText } from '../defaultInitialData';
import { PageContext } from '../PageContext';

export const ActionBar = ({
  addNewItem,
}: {
  addNewItem: (textItemProps: TextItemProps) => void;
}) => {
  const { sheetPosition } = useContext(PageContext);
  return (
    <div style={{ height: 30, marginBottom: 10 }}>
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
    </div>
  );
};
