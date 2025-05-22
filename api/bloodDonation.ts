import api from '../api/axiosInstance';

export const googleAuth = async () => {
  await api.get('/auth/google');
};
