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
  IconOverline,
  IconSquarePlus,
  IconStrikethrough,
  IconTrash,
  IconUnderline,
} from '@tabler/icons';
import { ObjectId } from 'bson';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { BasicFontPicker } from '../../../../form/FontSelector';
import { Input } from '../../../../form/Input';
import { IconButtonContainer } from '../../../../shared/IconsSelector/IconButton';
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

          <FontSizeInput
            value={selectedItemStyle.fontSize}
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

          <IconButtonContainer title='Delete element' className='danger'>
            <IconTrash onClick={deleteItem} />
          </IconButtonContainer>
        </>
      )}
    </div>
  );
};

const ColorInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (newColor: string) => void;
}) => {
  return (
    <Input
      name='color'
      type='color'
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        width: 30,
        height: 30,
      }}
      value={value}
      register={() => null}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const FontSizeInput = ({ onChange, value }) => {
  const [inputValue, setInputValue] = useState(null);
  useEffect(() => {
    const matchedValues = ('' + value).match(/([\d.]+)/);
    if (matchedValues) {
      const valueNumber = matchedValues[1];
      setInputValue(valueNumber);
    }
  }, [value]);
  return (
    <div style={{ marginRight: 10, display: 'flex', alignItems: 'center' }}>
      <Input
        id='fontSize'
        style={{
          width: 30,
          border: 'none',
          outline: 'none',
          textAlign: 'end',
        }}
        value={inputValue}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        name='fontSize'
        step='0.1'
        min={8}
        register={() => null}
        onChange={(event) => {
          const newValue = event.target.value;
          if (newValue.match(/^[\d.]+$/) || !newValue) {
            setInputValue(+newValue);
            onChange(newValue + 'px');
          }
        }}
      />
      <label htmlFor='fontSize'>px</label>
    </div>
  );
};
