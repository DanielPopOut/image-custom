import { useState } from 'react';
import Form from 'src/modules/form/Form';
import { Input } from 'src/modules/form/Input';
import { Template } from '../../models/template.model';
import { ResultDesign } from '../builderPage/ResultDesign';
import domtoimage from 'dom-to-image';
import { PreviewResultDesign } from '../../shared/PreviewResultDesign';

const DOM_ELEMENT_TO_SCREENSHOT_ID = 'UpdateTemplateWithParams';

export const UpdateTemplateWithParams = ({
  template,
}: {
  template: Template;
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const templateVariables = Template.generateDefaultQueryVariables(template);

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
    <div style={{ display: 'flex' }}>
      <div>
        <Form
          onSubmit={(data) => setFormValues(data)}
          defaultValues={formValues}
          style={{ display: 'flex', flexDirection: 'column', padding: 20 }}
        >
          {Object.entries(templateVariables).map((result) => {
            return <Input name={result[0]} label={result[0]} />;
          })}
        </Form>
      </div>
      <div>
        <ComponentToRender />
      </div>
      <GeneratePreview domElementId={DOM_ELEMENT_TO_SCREENSHOT_ID} />
    </div>
  );
};

const GeneratePreview = ({ domElementId }: { domElementId: string }) => {
  const [generatedDataUrl, setDataUrl] = useState<string>(null);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button
        onClick={() => {
          domtoimage
            .toPng(document.getElementById(domElementId))
            .then(function (dataUrl) {
              setDataUrl(dataUrl);
              //   var img = new Image();
              //   img.src = dataUrl;
              //   console.log(dataUrl);
              // document.body.appendChild(img);
            })
            .catch(function (error) {
              console.error('oops, something went wrong!', error);
            });
        }}
      >
        Go preview
      </button>
      {generatedDataUrl && <img src={generatedDataUrl}></img>}
    </div>
  );
};
