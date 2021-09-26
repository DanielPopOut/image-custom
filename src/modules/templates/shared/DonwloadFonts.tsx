import Head from 'next/head';

export const DownloadFonts = ({
  fontFamilyRequest,
}: {
  fontFamilyRequest: string;
}) => {
  if (!fontFamilyRequest) {
    return null;
  }
  return (
    <Head>
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
      <link href={fontFamilyRequest} rel='stylesheet'></link>
    </Head>
  );
};
