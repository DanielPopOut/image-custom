import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAsyncFn } from 'react-use';

export const UploadFileComponent = ({
  url,
  onChange,
  withValidation,
}: {
  url: string;
  onChange: (newValue: string) => void;
  withValidation?: boolean;
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
  useEffect(() => {
    setImageUrl(url);
  }, [url]);
  const onDeleteImage = () => {
    setImageUrl(null);
    onChange(null);
  };
  const uploadFile = (file: File) => {
    if (file) {
      const data = new FormData();
      data.append('file', file);
      uploadFileFn(data);
    }
  };
  return (
    <div>
      {!imageUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type='file'
            onChange={(event) => {
              const fileToUpload = event.target.files[0];
              if (withValidation) {
                setFile(fileToUpload);
              } else {
                uploadFile(fileToUpload);
              }
            }}
          />
          {withValidation && (
            <button
              style={{ maxWidth: 100 }}
              onClick={() => {
                uploadFile(file);
              }}
            >
              {uploadFileState.loading && 'loading'}
              Valider
            </button>
          )}
        </div>
      ) : (
        <ImagePreview url={imageUrl} onDelete={() => onDeleteImage()} />
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
      <Image src={url} width={200} height={200} objectFit='contain' />
      <button
        onClick={() => onDelete()}
        style={{ position: 'absolute', top: 10, left: 10 }}
      >
        Supprimer
      </button>
    </div>
  );
};
