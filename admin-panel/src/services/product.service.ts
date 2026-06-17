import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);

  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/products/${id}`
  );

  return response.data;
};

export const createProduct = async (data: any) => {
  const response = await axios.post(
    `${API_URL}/products`,
    data
  );

  return response.data;
};

export const updateProduct = async (
  id: string,
  data: any
) => {
  const response = await axios.patch(
    `${API_URL}/products/${id}`,
    data
  );

  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(
    `${API_URL}/products/${id}`
  );

  return response.data;
};