const axios = require('axios').default;

async function getUser() {
  try {
    const response = await axios.get(
      'https://pixabay.com/api/?key=30770270-1c512d3309800b706c0d5f4a2&q=dog&image_type=photo&orientation=horizontal&safesearch=true'
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
getUser();
