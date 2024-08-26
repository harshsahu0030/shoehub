import { IoMdClose } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../components/Admin/ProductForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProductsApi, updateProductApi } from "../../app/api/productApi";
import { useEffect } from "react";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  //react queries
  const {
    isError,
    data: productsData,
    error,
  } = useQuery({
    queryKey: ["get-product"],
    queryFn: () => getProductsApi(id),
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProductApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  return (
    <div className="container h-[85vh] flex flex-col gap-2 bg-slate-900 rounded-lg p-4 text-white scrollbar scrollbar-w-2 scrollbar-thumb-lightGray scrollbar-track-lightGray/20 overflow-y-scroll">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Update Product</h1>
          <p className="text-sm">Update the existing product</p>
        </div>
        <button className="text-4xl" onClick={() => navigate(-1)}>
          <IoMdClose />
        </button>
      </div>
      <div>
        {id ? (
          <ProductForm
            mutate={mutate}
            isPending={isPending}
            data={productsData?.data?.product}
          />
        ) : (
          "No product Found"
        )}
      </div>
    </div>
  );
};

export default UpdateProducts;
