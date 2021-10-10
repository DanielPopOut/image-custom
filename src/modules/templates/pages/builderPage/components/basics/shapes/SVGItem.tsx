import { memo, useEffect } from 'react';
import { useAsyncFn } from 'react-use';

export const useFetchSvg = (url: string) => {
  const [state, fetchSvg] = useAsyncFn(() =>
    fetch(url).then((res) => res.text()),
  );
  useEffect(() => {
    fetchSvg();
  }, []);
  return state.value;
};

export const SVGItem = memo(
  ({ url }: { url: string }) => {
    const svg = useFetchSvg(url);
    return (
      <div
        style={
          {
            width: '100%',
            height: '100%',
          } as any
        }
        dangerouslySetInnerHTML={{
          __html: svg,
        }}
      ></div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.url === nextProps.url;
  },
);
