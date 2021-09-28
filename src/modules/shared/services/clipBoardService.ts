export const clipBoardService = {
  copy: (data) => {
    const dataToSave = typeof data === 'string' ? data : JSON.stringify(data);
    navigator.clipboard.writeText(JSON.stringify(dataToSave));
  },
};
