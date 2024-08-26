import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import SearchBox from "../../components/SearchBox";
import { getAllProductsApi } from "../../app/api/productApi";
import { useQuery } from "@tanstack/react-query";
import { admin_Tables } from "../../data/AdminData";
import { useEffect } from "react";
import toast from "react-hot-toast";
import moment from "moment";

const AdminProducts = () => {
  const navigate = useNavigate();

  //react-quries
  const {
    isError,
    data: productsData,
    error,
  } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProductsApi,
  });

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  return (
    <div className="flex gap-3 h-[100%] container">
      {/* left  */}
      <div className="w-[20%] h-[100%]">
        <AdminSidebar />
      </div>

      {/* right  */}
      <div className="w-[80%] h-[100%] bg-slate-900 rounded-lg p-3 text-white overflow-y-scroll">
        {/* top  */}
        <div className="h-[9vh] container flex justify-between pb-3 border-b">
          <div className="w-[50%]">
            <SearchBox />
          </div>

          <button
            className="h-full w-fit px-5 flex justify-center items-center border rounded-full text-sm font-medium transition-all hover:bg-blue"
            onClick={() => navigate("/admin/products/create")}
          >
            Create New +
          </button>
        </div>

        {/* table  */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text- text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {admin_Tables?.products_tables?.map((item) => (
                  <th key={item} scope="col" className="px-6 py-3 text-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {productsData?.data?.products?.map((item, i) => (
                <tr
                  key={item._id}
                  className="bg-slate-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[20vh]"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      className="h-full object-contain"
                      height={100}
                      width={100}
                      src={item.images[0].url}
                      loading="lazy"
                      alt="img"
                    />
                  </td>
                  <td className="px-6 py-4 text-nowrap">{item._id}</td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.title?.length > 50
                      ? `${item.title.slice(0, 47)}...`
                      : item.title}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.gender}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.color}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.mrp.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.price.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="px-6 py-4 text-nowrap capitalize">
                    {item.action}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.createdAt).fromNow()}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.updatedAt).fromNow()}{" "}
                  </td>
                  <td className="px-6 py-4 text-right text-nowrap">
                    <Link
                      to={`/admin/products/${item._id}`}
                      className="font-semibold text-cyan text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
