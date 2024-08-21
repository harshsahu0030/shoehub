import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/Admin/ProductForm";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { createProductApi } from "../../app/api/productApi";

const CreateProduct = () => {
  const navigate = useNavigate();

  //react queires
  const { mutate, isPending } = useMutation({
    mutationFn: createProductApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(-1);
    },
  });

  return (
    <div className="container h-[85vh] flex flex-col gap-2 bg-slate-900 rounded-lg p-4 text-white scrollbar scrollbar-w-2 scrollbar-thumb-lightGray scrollbar-track-lightGray/20 overflow-y-scroll">
      <div className="flex justify-between items-center pb-4 border-b">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Create Product</h1>
          <p className="text-sm">Introduce th new product</p>
        </div>
        <button className="text-4xl" onClick={() => navigate(-1)}>
          <IoMdClose />
        </button>
      </div>
      <div>
        <ProductForm mutate={mutate} isPending={isPending} />
      </div>
    </div>
  );
};

export default CreateProduct;
