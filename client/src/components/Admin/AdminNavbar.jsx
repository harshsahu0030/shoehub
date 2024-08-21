import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="container h-[100%] text-md flex items-center gap-6 py-1 md:py-2 justify-between shadow- shadow-lightGray-500/50 px-5">
      {/* left  */}
      <div className="w-[40%] sm:w-[25%]  md:w-[20%] xl:w-[15%] h-full flex justify-start items-center">
        <Link to={"/admin/dashboard"} className="text-white flex flex-col">
          <span className="text-2xl font-bold">Shoehub</span>
          <span className="text-xs text-center font-medium">
            Admin Dashboard
          </span>
        </Link>
      </div>
    </div>
  );
};

export default AdminNavbar;
