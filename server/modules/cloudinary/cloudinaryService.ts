import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

class CloudinaryService {
  async upload(
    image,
    options: UploadApiOptions = {},
  ): Promise<UploadApiResponse> {
    const result = await cloudinary.uploader.upload(image, options);
    return result;
  }
}

export const cloudinaryService = new CloudinaryService();
