import axios from 'axios';

const AuthRepository = {
  async postGoogle(body: string) {
    try {
      const requestUrl = '/api/auth/google';
      const response = await axios.post(requestUrl, { body });
      return response.data;
    } catch (error) {
      console.error('Error en la solicitud a postGoogle:', error);
      throw error; // Lanza el error para que se maneje en el componente que llama a esta función
    }
  },

  // Agrega más métodos según las necesidades de tu aplicación
};

export default AuthRepository;
