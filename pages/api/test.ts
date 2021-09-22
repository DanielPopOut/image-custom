// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { CloudinaryService } from '../../server/modules/cloudinary/cloudinaryService';

export default async (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  const result = await new CloudinaryService().testUpload();
  res.status(200).json({ result });
};
