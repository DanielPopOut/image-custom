import { createContext, useState } from 'react';

export const PageContext = createContext<PageContentProps>({
  sheetPosition: { left: 0, top: 0, width: 0, height: 0 },
  updateSheetData: () => null,
});
type SheetData = { left: number; top: number; width: number; height: number };
export type PageContextData = {
  sheetPosition: SheetData;
};
type PageContentProps = PageContextData & {
  updateSheetData: (sheetData: SheetData) => void;
};

export const PageContextProvider = ({ children }) => {
  const [pageContextData, setPageContextData] = useState<PageContextData>({
    sheetPosition: { left: 0, top: 0, width: 0, height: 0 },
  });
  return (
    <PageContext.Provider
      value={{
        ...pageContextData,
        updateSheetData: (sheetData) => {
          setPageContextData({ ...pageContextData, sheetPosition: sheetData });
        },
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
