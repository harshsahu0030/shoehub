import AdminSidebar from "../../components/Admin/AdminSidebar";
import SearchBox from "../../components/SearchBox";

const AdminUsers = () => {
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
      </div>
    </div>
  );
};

export default AdminUsers;
