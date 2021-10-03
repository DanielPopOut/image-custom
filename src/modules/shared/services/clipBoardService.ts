import { ClipboardEvent } from 'react';

export const clipBoardService = {
  copy: (data) => {
    const dataToSave = typeof data === 'string' ? data : JSON.stringify(data);
    console.log(dataToSave);
    navigator.clipboard.writeText(JSON.stringify(dataToSave));
  },

  // Handle the event
  retrieveImageFromClipboardAsBlob: async (pasteEvent: ClipboardEvent) => {
    if (!pasteEvent.clipboardData) {
      return null;
    }

    var items = pasteEvent.clipboardData.items;

    if (items == undefined) {
      return null;
    }
    console.log('here');

    for (var i = 0; i < items.length; i++) {
      // Skip content if not image
      if (items[i].type.indexOf('image') == -1) continue;
      // Retrieve image on clipboard as blob
      console.log('found file');
      var blob = items[i].getAsFile();

      return blob;
    }
  },
};
