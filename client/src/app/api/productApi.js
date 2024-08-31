import axios from "axios";

//get all Products
export const getAllProductsApi = async ({
  keyword,
  gender,
  category,
  color,
  lPrice,
  hPrice,
  lRating,
  discount,
  sort,
  page,
}) => {
  let link = `/api/v1/products?${keyword !== "" ? `keyword=${keyword}` : ""}${
    gender !== "" ? `&gender=${gender}` : ""
  }${
    category && category.length > 0 ? `&category=${category?.join(" ")}` : ""
  }${lRating ? `&ratings[gte]=${lRating}` : ""}${
    discount ? `&discount[gte]=${discount}` : ""
  }${color && color.length > 0 ? `&color=${color?.join(" ")}` : ""}${
    lPrice ? `&price[gte]=${lPrice}` : ""
  }${hPrice ? `&price[lte]=${hPrice}` : ""}${
    sort !== "" ? `&sort=${sort}` : ""
  }${page !== "" ? `&page=${page}` : ""}`;

  const { data } = await axios.get(link);
  return data;
};

//get all Products
export const getSearchProductsApi = async (keyword) => {
  const { data } = await axios.get(`/api/v1/products?keyword=${keyword}`);
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
