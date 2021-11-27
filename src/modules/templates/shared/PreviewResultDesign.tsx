import { Template } from '../models/template.model';
import { ResultDesign } from '../pages/builderPage/ResultDesign';
import { DownloadFonts } from './DonwloadFonts';

export const PreviewResultDesign = ({
  templateData,
  queryElements,
  domElementToScreenshotId,
}: {
  templateData: Template;
  queryElements: Record<string, string>;
  domElementToScreenshotId?: string;
}) => {
  const template = new Template(
    JSON.parse(
      JSON.stringify({
        _id: templateData._id,
        ...templateData.publishedVersion,
      }),
    ),
  );
  Template.replaceValuesInTemplate(template, queryElements);
  const fontFamilyRequest = template.getGoogleRequestForFonts();
  return (
    <>
      <DownloadFonts fontFamilyRequest={fontFamilyRequest} />
      <ResultDesign
        domElementToScreenshotId={domElementToScreenshotId}
        {...{
          state: template,
          setItemToUpdate: () => null,
          itemToUpdate: '',
          updateElement: () => null,
          deleteElement: () => null,
        }}
      />
    </>
  );
};
