import axios from "axios";

//get all Products
export const getAllProductsApi = async () => {
  const { data } = await axios.get(`/api/v1/products`);
  return data;
};

//get Trending Products
export const getTrendingProductsApi = async () => {
  const { data } = await axios.get(`/api/v1/products?sort=createdAt,1`);
  return data;
};

//get top rated Products
export const getTopRatedProductsApi = async () => {
  const { data } = await axios.get(`/api/v1/products?sort=ratings,-1`);
  return data;
};

//get best seller Products
export const getBestSellerProductsApi = async () => {
  const { data } = await axios.get(`/api/v1/products?sort=numOfOrders,-1`);
  return data;
};

//get  Product
export const getProductsApi = async (id) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  return data;
};

//reviews
//add am=nd update Product
export const addAndUpdateReviewProductApi = async ({ commentForm, id }) => {
  const config = { headers: { "Content-Type": "application/json" } };

  const { data } = await axios.post(
    `/api/v1/products/review/${id}`,
    commentForm,
    config
  );
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
