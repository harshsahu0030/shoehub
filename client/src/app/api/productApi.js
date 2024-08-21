import axios from "axios";

//get all Product
export const getAllProductsApi = async () => {
  const { data } = await axios.get(`/api/v1/products`);
  return data;
};

//get  Product
export const getProductsApi = async (id) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  return data;
};

//-----------------------------------------------------------------------------
//admin routes

//create Product
export const createProductApi = async (productForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/admin/products/new`,
    productForm,
    config
  );
  return data;
};

//create Product
export const updateProductApi = async ({ newForm, id }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/v1/admin/products/${id}`,
    newForm,
    config
  );
  return data;
};
