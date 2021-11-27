import { useState } from 'react';
import Form from 'src/modules/form/Form';
import { Input } from 'src/modules/form/Input';
import { Template } from '../../models/template.model';
import domtoimage from 'dom-to-image';
import { PreviewResultDesign } from '../../shared/PreviewResultDesign';
import { stringHelper } from 'src/modules/shared/services/stringHelper';
import JSZip from 'jszip';

const DOM_ELEMENT_TO_SCREENSHOT_ID = 'UpdateTemplateWithParams';
const CUSTOM_IMAGE_NAME_FIELD = '__imageName__';
export const UpdateTemplateWithParams = ({
  template,
}: {
  template: Template;
}) => {
  const templateVariables = Template.generateDefaultQueryVariables(template);
  const [formValues, setFormValues] = useState<Record<string, string>>({
    [CUSTOM_IMAGE_NAME_FIELD]: Object.keys(templateVariables)
      .map((key) => `{${key}}`)
      .join('_'),
  });
  const [generatedImages, setGeneratedImages] = useState<
    Array<{
      fileName: string;
      dataUrl: string;
      blob: Blob;
    }>
  >([]);

  const ComponentToRender = () => {
    return (
      <PreviewResultDesign
        templateData={template}
        queryElements={formValues}
        domElementToScreenshotId={DOM_ELEMENT_TO_SCREENSHOT_ID}
      />
    );
  };

  return (
    <div>
      <h1>Generate images</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: 20 }}>
          <div>
            <h2 style={{ marginTop: 0 }}>Update variables</h2>
          </div>
          <Form
            onSubmit={() => {
              const fileName =
                stringHelper
                  .replaceValueInString(
                    formValues[CUSTOM_IMAGE_NAME_FIELD],
                    formValues,
                  )
                  .trim() + '.png';
              domtoimage
                .toBlob(document.getElementById(DOM_ELEMENT_TO_SCREENSHOT_ID))
                .then(function (blob) {
                  console.log(blob);
                  setGeneratedImages([
                    ...generatedImages,
                    { blob, dataUrl: URL.createObjectURL(blob), fileName },
                  ]);
                })
                .catch(function (error) {
                  console.error('oops, something went wrong!', error);
                });
            }}
            submitText={'Generate image'}
            onChange={(data) => setFormValues(data)}
            defaultValues={formValues}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {Object.entries(templateVariables).map((result) => {
              return <Input name={result[0]} label={result[0]} />;
            })}

            <Input name='__imageName__' label={'generated image name'} />
          </Form>
        </div>
        <div>
          <ComponentToRender />
        </div>
      </div>
      {generatedImages.length ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div>
            <button
              className='button'
              onClick={() => {
                var zip = new JSZip();

                generatedImages.forEach((generatedImage) => {
                  zip.file(generatedImage.fileName, generatedImage.blob);
                });

                zip.generateAsync({ type: 'blob' }).then(function (content) {
                  const ISODate = new Date().toISOString();
                  saveBlob(
                    URL.createObjectURL(content),
                    `images_${ISODate}.zip`,
                  );
                });
              }}
            >
              Download {generatedImages.length} images
            </button>
          </div>
          {generatedImages.map((generatedImage) => {
            return (
              <GeneratedImage
                key={generatedImage.dataUrl}
                fileName={generatedImage.fileName}
                dataUrl={generatedImage.dataUrl}
              ></GeneratedImage>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const GeneratedImage = ({
  fileName,
  dataUrl,
}: {
  fileName: string;
  dataUrl: string;
}) => {
  const [isOpen, toggleOpen] = useState(false);
  return (
    <div
      style={{
        padding: 20,
        margin: 'auto',
        border: '1px solid #ddd',
        width: '100%',
      }}
    >
      <div>
        <span
          style={{
            cursor: 'pointer',
            textDecoration: 'underline',
            marginRight: 10,
          }}
          onClick={() => toggleOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'See'}
        </span>
        Filename: {fileName} (
        <span
          onClick={() => saveBlob(dataUrl, fileName + '.png')}
          style={{ cursor: 'pointer' }}
        >
          download
        </span>
        )
      </div>
      {isOpen && (
        <div style={{ margin: '10px auto 0', width: 'fit-content' }}>
          <img src={dataUrl}></img>
        </div>
      )}
    </div>
  );
};

function saveBlob(url, fileName) {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';

  a.href = url;
  a.download = fileName;
  a.click();
  a.remove();
}
