import Image from 'next/image';
import { useState } from 'react';
import { useAsyncFn } from 'react-use';

export const UploadFileComponent = ({
  url,
  onChange,
}: {
  url: string;
  onChange: (newValue: string) => void;
}) => {
  const [file, setFile] = useState<File>(null);
  const [uploadFileState, uploadFileFn] = useAsyncFn(
    (formData: FormData): Promise<{ imageUrl: string }> => {
      return fetch('/api/images/upload', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((result: { imageUrl: string }) => {
          onChange(result.imageUrl);
          return result;
        });
    },
    null,
    { loading: false, value: { imageUrl: url } },
  );
  const imageUrl = uploadFileState.value?.imageUrl;
  return (
    <div>
      {!imageUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type='file'
            onChange={(event) => setFile(event.target.files[0])}
          />
          <button
            style={{ maxWidth: 100 }}
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
      ) : (
        <ImagePreview url={uploadFileState.value?.imageUrl} />
      )}
    </div>
  );
};

const ImagePreview = ({ url }: { url: string }) => {
  if (!url) {
    return null;
  }
  return <Image src={url} width={200} height={200} objectFit='cover' />;
};
