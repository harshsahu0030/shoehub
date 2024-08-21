import AdminSidebar from "../../components/Admin/AdminSidebar";

const Dashboard = () => {
  return (
    <div className="flex gap-3 h-[100%] container">
      {/* left  */}
      <div className="w-[20%] h-[100%]">
        <AdminSidebar />
      </div>

      {/* right  */}
      <div className="w-[80%] h-[100%] bg-slate-900 rounded-lg p-3 text-white">
        right
      </div>
    </div>
  );
};

export default Dashboard;
