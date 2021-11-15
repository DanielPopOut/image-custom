import { useRouter } from 'next/router';

type CustomImageData = {
  imageUrl: string;
  variables: Record<string, string>;
};

const BasicPage = () => {
  const router = useRouter();
  const imageUrl = router.query.imageUrl as string;
  const variables = router.query as Record<string, string>;
  const data: CustomImageData = { imageUrl, variables };
  return (
    <div>
      <Template1 {...data} />
    </div>
  );
};

const dimensions = { height: 300, width: 400 };

const defaultImage =
  'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80';

const Template1 = (data: CustomImageData) => {
  const { name, question } = data.variables;
  return (
    <div
      id='data_to_screenshot'
      style={{ width: 'fit-content', ...dimensions }}
    >
      <img
        width={dimensions.width}
        height={dimensions.height}
        src={data.imageUrl || defaultImage}
        style={{ objectFit: 'cover' }}
      />
      <div style={{ position: 'absolute', top: 0, left: 20, maxWidth: 350 }}>
        <h1 style={{ marginBottom: 10 }}>Hello {name} !</h1>
        <div
          style={{
            padding: '0 5px',
            marginLeft: 30,
            width: 'fit-content',
            fontWeight: 'bold',
            boxShadow: '15px 5px white',
          }}
        >
          {question}
        </div>
      </div>
    </div>
  );
};

//Autre image = https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80
export default BasicPage;
