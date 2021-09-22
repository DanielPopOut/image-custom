import {
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

cloudinary.config({
  cloud_name: 'dxg40tvxm',
  api_key: '245386276536775',
  api_secret: 'GQWqscXkN1ECiILOoCsvGgfWbOY',
  secure: true,
});

class CloudinaryService {
  testUpload = async (url?: string) => {
    try {
      console.log('jony');
      //const uploadPreset = await this.createUploadPreset();
      //console.log({ uploadPreset });
      return this.unsigned_upload(
        'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg'
      );
    } catch (e) {
      console.log({ e });
    }
  };

  createUploadPreset = async () => {
    return new Promise((resolve, reject) => {
      cloudinary.api.create_upload_preset(
        {
          name: 'my_preset',
          unsigned: true,
          folder: 'new-products',
          tags: 0.2,
        },
        function (error, result) {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  };

  async upload(
    image,
    options: UploadApiOptions = {}
  ): Promise<UploadApiResponse> {
    console.log('lion');
    console.log(cloudinary.config().api_key, { image, options });
    const result = await cloudinary.uploader.upload(image, options);
    return result;
  }

  async unsigned_upload(
    image,
    options: UploadApiOptions = {}
  ): Promise<UploadApiResponse> {
    console.log(cloudinary.config().api_key, { image, options });
    const result = await cloudinary.uploader.unsigned_upload(
      image,
      'ml_default',
      options
    );
    return result;
  }
}

export const cloudinaryService = new CloudinaryService();
