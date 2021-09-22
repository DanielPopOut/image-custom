// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nextConnect from 'next-connect';
import multer from 'multer';
import { CloudinaryService } from '../../../server/modules/cloudinary/cloudinaryService';
import { NextApiRequest, NextApiResponse } from 'next';

type NextApiRequestWithFormData = NextApiRequest & {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: null;
  };
};

const apiRoute = nextConnect();
const upload = multer({ dest: '/tmp' });
apiRoute.use(upload.single('file'));

apiRoute.post(async (req: NextApiRequestWithFormData, res: NextApiResponse) => {
  let fileUploaded = undefined;
  console.log(req.file);
  try {
    const result = await new CloudinaryService().unsigned_upload(
      req.file.path,
      {
        resource_type: 'image',
        public_id: `/user1/nininini/${new Date().toISOString()}`,
      }
    );
    console.log('result', { result });
    res.json({ result });
  } catch (e) {
    console.error(e);
    res.status(400).json({ e });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
