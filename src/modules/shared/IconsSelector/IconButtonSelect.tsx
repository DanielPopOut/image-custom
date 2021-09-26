import { HTMLAttributes, ReactNode, useEffect, useState } from 'react';
import { IconButtonContainer } from './IconButton';

type IconData = { Icon: ReactNode; value: string; title?: string };

export const IconButtonSelect: React.FC<
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    value?: string;
    items: Array<IconData>;
    onChange: (data: string) => void;
  }
> = ({ className, value, items, children, onChange, ...props }) => {
  const [selectedItemIndex, setSelectedItem] = useState<number>(
    items.findIndex((item) => item.value === value),
  );
  useEffect(() => {
    setSelectedItem(items.findIndex((item) => item.value === value));
  }, [value]);
  const { Icon, ...item } = items[selectedItemIndex];
  return (
    <IconButtonContainer
      title={item.title || item.value}
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
