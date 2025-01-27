import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Crear una instancia de axios con la configuración base
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Importante si estás usando cookies
  headers: {
    'Content-Type': 'application/json',
  }
});

export const createOrder = async (orderData: any) => {
  try {
    const response = await axiosInstance.post('/orders', orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get('/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};