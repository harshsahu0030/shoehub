import { Link } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";

const Admin = () => {
  return (
    <div className="flex gap-3 h-[100%] container">
      {/* left  */}
      <div className="w-[20%] h-[100%]">
        <AdminSidebar />
      </div>

      {/* right  */}
      <div className="w-[80%] h-[100%] bg-slate-900 rounded-lg p-3 text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold">Welcome to Admin</h1>
        <p>Here your see every backside of your website.</p>
        <Link
          to={"/admin/dashboard"}
          className="text-sm font-semibold py-2 px-4 border rounded-lg hover:bg-gray/20"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Admin;
