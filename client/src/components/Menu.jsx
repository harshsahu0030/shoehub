import { Link, NavLink } from "react-router-dom";
import MenuButton from "./buttons/MenuButton";
import { categories } from "../data/category";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

const Menu = () => {
  return (
    <div className="container h-[100%] text-md flex items-center gap-4 justify-between">
      {/* left  */}
      <div className="h-full w-[30%] xl:w-[20%] px-2">
        <MenuButton />
      </div>

      {/* right  */}
      <div className="h-full flex w-[70%] xl:w-[60%] justify-end relative">
        <ul className="h-full container grid grid-cols-5 items-center gap-5 text-md lg:text-xl font-semibold text-gray">
          <li className="h-full container">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "uppercase border-b-4 text-blue h-full flex items-center justify-center"
                  : "uppercase h-full flex items-center justify-center border-b-4 border-transparent hover:border-blue"
              }
            >
              HOME
            </NavLink>
          </li>

          {categories &&
            categories.map((item, i) => (
              <li key={i} className="h-full container group/megamenu">
                <span className="uppercase gap-1 h-full flex items-center justify-center border-b-4 border-transparent group-hover/megamenu:border-blue cursor-pointer">
                  {item.gender}
                  <IoIosArrowDown className="text-xl" height={30} width={30} />
                </span>

                <div className="absolute w-[100%] h-[0%] opacity-0 invisible bg-white rounded-lg top-[100%] left-0 group-hover/megamenu:visible group-hover/megamenu:h-[auto] group-hover/megamenu:opacity-100 group-hover/megamenu:p-5 transition-all ease-in-out duration-300   overflow-hidden shadow-lg shadow-lightGray-500/50 z-10 flex flex-col gap-2 cursor-default">
                  <Link
                    to={`/products?g=${item.gender}`}
                    className="w-fit flex items-center gap-2 text-md font-bold uppercase py-1 border-b border-lightGray text-blue"
                  >
                    {item.gender}
                    <IoIosArrowRoundForward
                      height={30}
                      width={30}
                      className="text-xl"
                    />
                  </Link>
                  <div className="columns-3 text-gray text-base font-medium">
                    {item.types.sort().map((type, i) => (
                      <Link
                        key={i}
                        to={`/products?g=${item.gender}&cat=${type}`}
                        className="block hover:text-blue py-1 capitalize"
                      >
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}

          <li className="h-full container">
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "uppercase border-b-4 text-blue h-full flex items-center justify-center"
                  : "uppercase h-full flex items-center justify-center border-b-4 border-transparent hover:border-blue"
              }
            >
              CONTACT
            </NavLink>
          </li>

          <li className="h-full container">
            <NavLink
              to="/blog"
              className={({ isActive, isPending }) =>
                isPending
                  ? ""
                  : isActive
                  ? "uppercase border-b-4 text-blue h-full flex items-center justify-center"
                  : "uppercase h-full flex items-center justify-center border-b-4 border-transparent hover:border-blue"
              }
            >
              BLOG
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
