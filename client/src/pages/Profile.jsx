import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { profile_data } from "../data/profile";
import MetaData from "../utils/MetaData";

const Profile = () => {
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
  return (
    <>
      <MetaData
        title={`Shoehub | Profile`}
        description={`User information, profile details`}
        keywords={`user info, user, profile`}
      />
      <div className="flex flex-col gap-3 mt-10 w-full md:w-[50%] m-auto">
        <h1 className="text-3xl font-semibold">Your Profile</h1>

        <hr className="border-b-2 border-lightGray/50" />

        <ul className="flex flex-col gap-2">
          {profile_data &&
            profile_data.links.map((item, i) => (
              <li
                key={i}
                className="capitalize text-lg font-medium p-4 border border-lightGray/60 rounded-lg hover:bg-lightGray/30 transition-all"
              >
                <Link
                  to={item.url}
                  className="flex items-center justify-between"
                >
                  {item.name}{" "}
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default Profile;
