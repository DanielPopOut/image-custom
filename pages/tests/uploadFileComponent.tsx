import { useState } from 'react';
import { useAsyncFn } from 'react-use';

const UploadFile = () => {
  const [file, setFile] = useState<File>(null);
  const [uploadFileState, uploadFileFn] = useAsyncFn((formData: FormData) => {
    return fetch('/api/images/upload', { method: 'POST', body: formData });
  });
  return (
    <div>
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />
      <button
        onClick={() => {
          if (file) {
            const data = new FormData();
            data.append('file', file);
            uploadFileFn(data);
          }
        }}
      >
        {uploadFileState.loading && 'loading'}
        Valider
      </button>
    </div>
  );
};

export default UploadFile;
