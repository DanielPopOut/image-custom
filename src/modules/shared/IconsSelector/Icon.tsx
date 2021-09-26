import type * as AllIcons from '@tabler/icons';
import dynamic from 'next/dynamic';

export const Icon = ({
  name,
  color,
}: {
  name: keyof typeof AllIcons;
  color?: string;
}) => {
  const IconToShow = dynamic(
    //@ts-ignore
    () => import('@tabler/icons').then((icons) => icons[name]),
    { ssr: false },
  );
  return <IconToShow color={color} />;
};
