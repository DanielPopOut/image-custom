import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconFlipHorizontal,
  IconFlipVertical,
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
  IconRotate,
  IconStrikethrough,
  IconTrash,
  IconUnderline,
} from '@tabler/icons';
import { ObjectId } from 'bson';
import { CSSProperties, useContext } from 'react';
import { BackgroundInputBase } from 'src/modules/form/BackgroundInput';
import { BasicFontPicker } from 'src/modules/form/FontSelector';
import { IconButtonContainer } from 'src/modules/shared/IconsSelector/IconButton';
import { IconButtonMenu } from 'src/modules/shared/IconsSelector/IconButtonMenu';
import { IconButtonSelect } from 'src/modules/shared/IconsSelector/IconButtonSelect';
import { ItemProps } from '../../../../models/template.model';
import { PageContext } from '../../contexts/PageContext';
import {
  getDefaultImage,
  getDefaultShape,
  getDefaultText,
} from '../../defaultInitialData';
import { ShapesSelector } from '../basics/shapes/ShapesSelector';
import { ColorInput, GradientInput } from '../ColorInput';
import { AngleSelector } from '../ColorInput/AngleSelector';
import { SizeInput } from '../SizeInput';

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
        <IconButtonMenu Icon='shape'>
          <ShapesSelector
            onSelect={(shapeData) => {
              addNewItem({
                id: new ObjectId().toHexString(),
                ...getDefaultShape({
                  shapeData,
                  left: sheetPosition.width / 2,
                  top: sheetPosition.height / 2,
                }),
              });
            }}
          />
        </IconButtonMenu>
      </IconButtonMenu>

      {selectedItem?.type === 'shape' && (
        <>
          {Object.keys(selectedItem.shapeData?.colors || {})?.map(
            (colorKey) => {
              const styleKey = `--${colorKey}`;
              return (
                <div style={{ marginRight: 5 }} key={colorKey}>
                  <ColorInput
                    value={selectedItemStyle[styleKey]}
                    onChange={(newColor) =>
                      updateElementStyle({ [styleKey]: newColor })
                    }
                  />
                </div>
              );
            },
          )}
        </>
      )}

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
            suffix='px'
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
                multiplicationCoeff={1000}
                transformResult={(value) => `${value}em`}
                suffix={<span style={{ fontSize: '0.8em' }}>em</span>}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconLineHeight />{' '}
              <SizeInput
                value={selectedItemStyle.lineHeight as string}
                onChange={(data) => updateElementStyle({ lineHeight: data })}
                transformResult={(value) => value?.toString()}
              />
            </div>
          </IconButtonMenu>
          <div style={{ marginLeft: 5 }}>
            <GradientInput
              value={selectedItemStyle.backgroundImage as string}
              onChange={(newColor) =>
                updateElementStyle({ backgroundImage: newColor })
              }
            />
          </div>
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
          <div style={{ marginRight: 5 }}>
            <IconButtonSelect
              value={
                (selectedItemStyle.transform as string)?.includes('scaleX(-1)')
                  ? 1
                  : null
              }
              items={[
                { Icon: <IconFlipVertical stroke={0.5} />, value: null },
                { Icon: <IconFlipVertical stroke={2} />, value: 1 },
              ]}
              onChange={(value) => {
                const currentTransformValue = selectedItemStyle.transform || '';
                updateElementStyle({
                  transform: value
                    ? [currentTransformValue, 'scaleX(-1)'].join(' ')
                    : currentTransformValue.replace(/scaleX\(-1\)/g, '').trim(),
                } as CSSProperties);
              }}
            />
          </div>
          <div style={{ marginRight: 5 }}>
            <IconButtonSelect
              value={
                (selectedItemStyle.transform as string)?.includes('scaleY(-1)')
                  ? 1
                  : null
              }
              items={[
                { Icon: <IconFlipHorizontal stroke={0.5} />, value: null },
                { Icon: <IconFlipHorizontal stroke={2} />, value: 1 },
              ]}
              onChange={(value) => {
                const currentTransformValue = selectedItemStyle.transform || '';
                updateElementStyle({
                  transform: value
                    ? [currentTransformValue, 'scaleY(-1)'].join(' ')
                    : currentTransformValue.replace(/scaleY\(-1\)/g, '').trim(),
                } as CSSProperties);
              }}
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
          <IconButtonMenu Icon={<IconRotate />}>
            <div style={{ padding: 10, minWidth: 200 }}>
              <AngleSelector
                value={
                  +(
                    selectedItemStyle.transform?.match(
                      /rotate\((\d*)deg\)/,
                    )?.[1] || 0
                  )
                }
                onChange={(newRotateValue) => {
                  const currentTransformValue =
                    (selectedItemStyle.transform as string) || '';
                  updateElementStyle({
                    transform: [
                      currentTransformValue.replace(/rotate\(.*\)/g, '').trim(),
                      `rotate(${newRotateValue}deg)`,
                    ].join(' '),
                  } as CSSProperties);
                }}
              />
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
