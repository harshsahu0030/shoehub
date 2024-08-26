import { useQuery } from "@tanstack/react-query";
import { getAllUsersApi } from "../../app/api/userApi";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import SearchBox from "../../components/SearchBox";
import { admin_Tables } from "../../data/AdminData";
import moment from "moment";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdminUsers = () => {
  //react-quries
  const {
    isError,
    data: usersData,
    error,
  } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsersApi,
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
      <div className="w-[80%] h-[100%] bg-slate-900 rounded-lg p-3 text-white">
        {/* top  */}
        <div className="h-[9vh] container flex justify-between pb-3 border-b">
          <div className="w-[50%]">
            <SearchBox />
          </div>
        </div>

        {/* table  */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text- text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {admin_Tables?.users_tables?.map((item) => (
                  <th key={item} scope="col" className="px-6 py-3 text-nowrap">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {usersData?.data?.map((item, i) => (
                <tr
                  key={item._id}
                  className="bg-slate-700 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-[10vh]"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{item._id}</td>
                  <td className="px-6 py-4">{item.username}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">
                    {moment(item.createdAt).fromNow()}{" "}
                  </td>

                  <td className="px-6 py-4 text-right text-nowrap">
                    <Link
                      to={`#`}
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

export default AdminUsers;
