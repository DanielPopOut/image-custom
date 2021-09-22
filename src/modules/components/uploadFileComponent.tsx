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
          setImageUrl(result.imageUrl);
          return result;
        });
    },
    null,
    { loading: false, value: { imageUrl: url } },
  );
  const [imageUrl, setImageUrl] = useState(url);
  const onDeleteImage = () => {
    setImageUrl(null);
    onChange(null);
  };
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
        <ImagePreview
          url={uploadFileState.value?.imageUrl}
          onDelete={() => onDeleteImage()}
        />
      )}
    </div>
  );
};

const ImagePreview = ({
  url,
  onDelete,
}: {
  url: string;
  onDelete: () => void;
}) => {
  if (!url) {
    return null;
  }
  return (
    <div style={{ position: 'relative' }}>
      <Image src={url} width={200} height={200} objectFit='cover' />
      <button
        onClick={() => onDelete()}
        style={{ position: 'absolute', top: 10, left: 10 }}
      >
        Supprimer
      </button>
    </div>
  );
};
