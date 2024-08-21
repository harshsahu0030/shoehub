import { Link, NavLink } from "react-router-dom";
import { admin_sidebar } from "../../data/AdminData";

const AdminSidebar = () => {
  return (
    <div className="container h-full p-3 flex flex-col justify-between bg-slate-900 text-white rounded-lg">
      <ul className="flex flex-col gap-2">
        {admin_sidebar &&
          admin_sidebar.links.map((item, i) => (
            <li key={i} className="text-lg font-semibold uppercase">
              <NavLink
                to={item.url}
                className={({ isActive, isPending }) =>
                  isPending
                    ? ""
                    : isActive
                    ? "w-[100%] flex bg-slate-600 p-3 rounded-lg"
                    : "w-[100%] flex p-3"
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
      </ul>

      <Link
        to={"/"}
        className="w-[100%] flex p-3 rounded-lg text-md font-semibold capitalize"
      >
        back to home
      </Link>
    </div>
  );
};

export default AdminSidebar;
