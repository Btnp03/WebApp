// src/services/typeApi.js
// อ้างอิงสไลด์หน้า 17: Services สำหรับเรียก API Type ด้วย Axios
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/type';

export const typeApi = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
};
