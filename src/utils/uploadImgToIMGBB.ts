import axios from 'axios';

export const uploadImageToImgBB = async (imageFile:File) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API;
  const formData = new FormData();

  formData.append('image', imageFile);

  try {
    const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.data && response.data.data.url) {
      return response.data.data.url;
    } else {
      throw new Error('Failed to upload image');
    }
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error);
    throw error;
  }
};

