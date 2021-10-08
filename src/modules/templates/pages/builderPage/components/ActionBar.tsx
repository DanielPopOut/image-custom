import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconGlass,
  IconItalic,
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  IconLayoutGridAdd,
  IconLetterCaseLower,
  IconLetterCaseToggle,
  IconLetterCaseUpper,
  IconLettersCase,
  IconLetterSpacing,
  IconLineHeight,
  IconOverline,
  IconPhoto,
  IconStrikethrough,
  IconTrash,
  IconUnderline,
} from '@tabler/icons';
import { ObjectId } from 'bson';
import { CSSProperties, useContext } from 'react';
import { BackgroundInputBase } from '../../../../form/BackgroundInput';
import { BasicFontPicker } from '../../../../form/FontSelector';
import { IconButtonContainer } from '../../../../shared/IconsSelector/IconButton';
import { IconButtonMenu } from '../../../../shared/IconsSelector/IconButtonMenu';
import { IconButtonSelect } from '../../../../shared/IconsSelector/IconButtonSelect';
import { ItemProps } from '../../../models/template.model';
import { PageContext } from '../contexts/PageContext';
import { getDefaultImage, getDefaultText } from '../defaultInitialData';
import { ColorInput } from './ColorInput';
import { SizeInput } from './SizeInput';

export const ActionBar = ({
  addNewItem,
  deleteItem,
  selectedItem,
  updateElementStyle,
}: {
  addNewItem: (textItemProps: ItemProps) => void;
  deleteItem: (itemId: string) => void;
  selectedItem: ItemProps;
  updateElementStyle: (data: Partial<CSSProperties>) => void;
}) => {
  const { sheetPosition } = useContext(PageContext);
  const selectedItemStyle = selectedItem?.style;

  return (
    <div
      style={{
        height: 30,
        display: 'flex',
        alignItems: 'center',
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <IconButtonMenu
        Icon={
          <div>
            <IconLayoutGridAdd />
          </div>
        }
        title='New text'
      >
        <div
          style={{ cursor: 'pointer' }}
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
        >
          Text
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            addNewItem({
              id: new ObjectId().toHexString(),
              ...getDefaultImage({
                left: sheetPosition.width / 2,
                top: sheetPosition.height / 2,
              }),
            });
          }}
        >
          Image
        </div>
      </IconButtonMenu>

      {selectedItem?.type === 'text' && (
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
            value={selectedItemStyle.justifyContent || 'flex-start'}
            items={[
              { Icon: <IconLayoutAlignLeft />, value: 'flex-start' },
              { Icon: <IconLayoutAlignCenter />, value: 'center' },
              { Icon: <IconLayoutAlignRight />, value: 'flex-end' },
            ]}
            onChange={(value) => {
              updateElementStyle({ justifyContent: value } as CSSProperties);
            }}
          />

          <IconButtonSelect
            value={selectedItemStyle.alignItems || 'flex-start'}
            items={[
              { Icon: <IconLayoutAlignTop />, value: 'flex-start' },
              { Icon: <IconLayoutAlignMiddle />, value: 'center' },
              { Icon: <IconLayoutAlignBottom />, value: 'flex-end' },
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
        </>
      )}

      {selectedItem?.type === 'image' && (
        <>
          <IconButtonMenu Icon={<IconPhoto />}>
            <div style={{ minWidth: 200, minHeight: 200 }}>
              <BackgroundInputBase
                value={selectedItemStyle.backgroundImage}
                onChange={(data) =>
                  updateElementStyle({ backgroundImage: data })
                }
              />
            </div>
          </IconButtonMenu>{' '}
        </>
      )}

      {selectedItem && (
        <>
          <div style={{ marginRight: 5 }}>
            <ColorInput
              value={selectedItemStyle.backgroundColor}
              onChange={(newColor) =>
                updateElementStyle({ backgroundColor: newColor })
              }
            />
          </div>
          <IconButtonMenu
            Icon={
              <div className='linear-opacity'>
                <IconGlass />
              </div>
            }
          >
            <div style={{ padding: 10, minWidth: 200 }}>
              <label>
                Opacity{' '}
                <input
                  value={selectedItemStyle.opacity}
                  onChange={(event) => {
                    updateElementStyle({ opacity: event.target.value });
                  }}
                  type='number'
                  step={0.01}
                  min={0}
                  max={1}
                  size={3}
                  defaultValue={1}
                />
              </label>
            </div>
          </IconButtonMenu>
        </>
      )}

      {selectedItemStyle && (
        <IconButtonContainer title='Delete element' className='danger'>
          <IconTrash onClick={() => deleteItem(selectedItem.id)} />
        </IconButtonContainer>
      )}
    </div>
  );
};
