import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  IconLetterCaseLower,
  IconLetterCaseToggle,
  IconLetterCaseUpper,
  IconLettersCase,
  IconLetterSpacing,
  IconLineHeight,
  IconOverline,
  IconSquarePlus,
  IconStrikethrough,
  IconTrash,
  IconUnderline,
} from '@tabler/icons';
import { ObjectId } from 'bson';
import { CSSProperties, useContext } from 'react';
import { BasicFontPicker } from '../../../../form/FontSelector';
import { IconButtonContainer } from '../../../../shared/IconsSelector/IconButton';
import { IconButtonMenu } from '../../../../shared/IconsSelector/IconButtonMenu';
import { IconButtonSelect } from '../../../../shared/IconsSelector/IconButtonSelect';
import { TextItemProps } from '../../../models/template.model';
import { PageContext } from '../contexts/PageContext';
import { getDefaultText } from '../defaultInitialData';
import { ColorInput } from './ColorInput';
import { SizeInput } from './SizeInput';

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
    <div
      style={{
        height: 30,
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButtonContainer title='New text'>
        <IconSquarePlus
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
      </IconButtonContainer>

      {selectedItemStyle && (
        <>
          <div style={{ marginRight: 5 }}>
            <ColorInput
              value={selectedItemStyle.color}
              onChange={(newColor) => updateElementStyle({ color: newColor })}
            />
          </div>

          <div style={{ marginRight: 10 }}>
            <BasicFontPicker
              activeFontFamily={selectedItemStyle.fontFamily}
              onChange={(newFontFamily) =>
                updateElementStyle({ fontFamily: newFontFamily })
              }
            />
          </div>

          <SizeInput
            value={selectedItemStyle.fontSize as string}
            onChange={(value) => {
              updateElementStyle({ fontSize: value } as CSSProperties);
            }}
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
          <IconButtonSelect
            value={selectedItemStyle.fontWeight || 400}
            items={[
              { Icon: <IconBold stroke={1.5} />, value: 400, title: 'normal' },
              { Icon: <IconBold stroke={3} />, value: 700, title: 'bold' },
              { Icon: <IconBold stroke={0.5} />, value: 300, title: 'light' },
            ]}
            onChange={(value) => {
              updateElementStyle({ fontWeight: value } as CSSProperties);
            }}
          />
          <IconButtonSelect
            value={selectedItemStyle.fontStyle || ''}
            items={[
              { Icon: <IconItalic stroke={0.5} />, value: '' },
              { Icon: <IconItalic stroke={2} />, value: 'italic' },
            ]}
            onChange={(value) => {
              updateElementStyle({ fontStyle: value } as CSSProperties);
            }}
          />

          <IconButtonSelect
            value={(selectedItemStyle.textDecoration as string) || ''}
            items={[
              { Icon: <IconUnderline stroke={0.5} />, value: '' },
              { Icon: <IconUnderline stroke={2} />, value: 'underline' },
              { Icon: <IconOverline stroke={2} />, value: 'overline' },
              { Icon: <IconStrikethrough stroke={2} />, value: 'line-through' },
            ]}
            onChange={(value) => {
              updateElementStyle({ textDecoration: value } as CSSProperties);
            }}
          />

          <IconButtonSelect
            value={(selectedItemStyle.textTransform as string) || ''}
            items={[
              { Icon: <IconLetterCaseToggle stroke={0.5} />, value: '' },
              { Icon: <IconLetterCaseLower stroke={2} />, value: 'lowercase' },
              { Icon: <IconLetterCaseUpper stroke={2} />, value: 'uppercase' },
              { Icon: <IconLettersCase stroke={2} />, value: 'capitalize' },
            ]}
            onChange={(value) => {
              updateElementStyle({ textTransform: value } as CSSProperties);
            }}
          />

          <IconButtonMenu Icon={<IconLineHeight />}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconLetterSpacing />{' '}
              <SizeInput
                value={selectedItemStyle.letterSpacing as string}
                onChange={(data) => updateElementStyle({ letterSpacing: data })}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconLineHeight />{' '}
              <SizeInput
                value={selectedItemStyle.lineHeight as string}
                onChange={(data) => updateElementStyle({ lineHeight: data })}
              />
            </div>
          </IconButtonMenu>

          <IconButtonContainer title='Delete element' className='danger'>
            <IconTrash onClick={deleteItem} />
          </IconButtonContainer>
        </>
      )}
    </div>
  );
};
