import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { IconButtonContainer } from './IconButton';

type IconData = { Icon: ReactNode; value: string | number; title?: string };

export const IconButtonSelect: React.FC<
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value?: string | number;
    items: Array<IconData>;
    onChange: (data: string | number) => void;
  }
> = ({ className, value, items, children, onChange, ...props }) => {
  const [selectedItemIndex, setSelectedItem] = useState<number>(0);
  useEffect(() => {
    const indexFound = items.findIndex((item) => item.value === value);
    setSelectedItem(indexFound > -1 ? indexFound : 0);
  }, [value]);

  const { Icon, ...item } = items[selectedItemIndex];
  const stringValueTitle =
    typeof item.value === 'number' ? item.value.toString() : item.value;
  return (
    <IconButtonContainer
      title={item.title || stringValueTitle}
      {...props}
      onClick={() => {
        const newIndex = (selectedItemIndex + 1) % items.length;
        setSelectedItem(newIndex);
        onChange(items[newIndex].value);
      }}
    >
      {Icon}
    </IconButtonContainer>
  );
};
