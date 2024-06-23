import axios from 'axios';

export async function fetchImages(options) {
  const params = {
    key: '7794456-14148324ae4ced2c6e82d12c0',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    ...options,
  };

  const response = await axios.get('https://pixabay.com/api/', {
    method: 'GET',
    params,
  });

  return response.data;
}
